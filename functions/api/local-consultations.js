/**
 * Cloudflare Pages Function — checks official council engagement portals (cached 1 hour).
 * Returns scrape metadata; full consultation data still loads from data/local-data.js.
 */

const CACHE_TTL = 3600;

const SCRAPE_TARGETS = [
  { councilId: "perth", url: "https://yoursay.perth.wa.gov.au/" },
  { councilId: "fremantle", url: "https://mysay.fremantle.wa.gov.au/" },
  { councilId: "rockingham", url: "https://yourthoughts.rockingham.wa.gov.au/" },
  { councilId: "busselton", url: "https://yoursay.busselton.wa.gov.au/" },
  { councilId: "kalgoorlie-boulder", url: "https://yoursay.ckb.wa.gov.au/" },
  { councilId: "wanneroo", url: "https://yoursay.wanneroo.wa.gov.au/" },
  { councilId: "joondalup", url: "https://www.joondalup.wa.gov.au/community-and-spaces/community-consultation" },
  { councilId: "stirling", url: "https://www.stirling.wa.gov.au/city-and-council/shaping-our-city" }
];

function extractLastUpdated(source) {
  const match = source.match(/const localLastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  return match ? match[1] : null;
}

async function scrapeCouncilStatus(target) {
  try {
    const response = await fetch(target.url, {
      headers: { "User-Agent": "LegislationWatchBot/1.0 (+https://legislation-watch-australia.pages.dev)" },
      cf: { cacheTtl: CACHE_TTL }
    });
    if (!response.ok) {
      return { councilId: target.councilId, ok: false, status: response.status };
    }
    const html = await response.text();
    const hasConsultationSignals =
      /consultation|have your say|community engagement|public comment|submission/i.test(html);
    const linkCount = (html.match(/href="[^"]*(consult|project|survey|engagement)[^"]*"/gi) || []).length;
    return {
      councilId: target.councilId,
      ok: true,
      sourceUrl: target.url,
      hasConsultationSignals,
      estimatedLinks: linkCount,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    return { councilId: target.councilId, ok: false, error: String(error) };
  }
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL("/api/local-consultations", request.url).toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let lastUpdated = null;
  try {
    const assetUrl = new URL("/data/local-data.js", request.url);
    const assetResponse = await fetch(assetUrl.toString());
    if (assetResponse.ok) {
      lastUpdated = extractLastUpdated(await assetResponse.text());
    }
  } catch {
    /* optional */
  }

  const scrapeResults = await Promise.all(SCRAPE_TARGETS.map(scrapeCouncilStatus));

  const body = {
    lastUpdated,
    scrapedAt: new Date().toISOString(),
    scrapeStatus: scrapeResults
  };

  const response = Response.json(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": `public, max-age=${CACHE_TTL}`
    }
  });

  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
