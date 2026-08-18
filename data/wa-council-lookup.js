/**
 * WA local government lookup by postcode or suburb/city name.
 * Postcode boundaries can overlap or span multiple LGAs — always verify on official council sites.
 *
 * Representative URLs verified against live council websites (Aug 2026).
 */

const waCouncilRegistry = [
  {
    id: "perth",
    name: "City of Perth",
    engagementUrl: "https://yoursay.perth.wa.gov.au/",
    website: "https://www.perth.wa.gov.au/",
    scrapeUrl: "https://yoursay.perth.wa.gov.au/",
    postcodes: ["6000", "6003", "6004", "6005", "6006", "6007", "6008", "6837", "6838", "6843", "6844", "6845", "6846", "6847", "6848", "6849", "6850"],
    suburbs: ["Perth", "Perth CBD", "Northbridge", "East Perth", "West Perth", "Claisebrook", "Crawley", "Nedlands"],
    aliases: ["perth city", "cbd"],
    representatives: {
      council: {
        label: "City of Perth Council",
        mayorUrl: "https://www.perth.wa.gov.au/council/about-council/elected-members",
        councillorsUrl: "https://www.perth.wa.gov.au/council/about-council/elected-members",
        contactUrl: "https://www.perth.wa.gov.au/contact-us",
        phone: "08 9461 3333"
      },
      state: { electorate: "Perth", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Perth", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "fremantle",
    name: "City of Fremantle",
    engagementUrl: "https://mysay.fremantle.wa.gov.au/",
    website: "https://www.fremantle.wa.gov.au/",
    scrapeUrl: "https://mysay.fremantle.wa.gov.au/",
    postcodes: ["6158", "6160", "6162", "6163", "6164", "6959"],
    suburbs: ["Fremantle", "North Fremantle", "South Fremantle", "Beaconsfield", "White Gum Valley", "Hilton", "O'Connor", "Samson", "Walyalup"],
    aliases: ["freo"],
    representatives: {
      council: {
        label: "City of Fremantle Council",
        mayorUrl: "https://www.fremantle.wa.gov.au/your-city-and-council/about-council/your-elected-members/",
        councillorsUrl: "https://www.fremantle.wa.gov.au/your-city-and-council/about-council/your-elected-members/",
        contactUrl: "https://www.fremantle.wa.gov.au/contact-us",
        phone: "08 9432 9999"
      },
      state: { electorate: "Fremantle", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Fremantle", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "rockingham",
    name: "City of Rockingham",
    engagementUrl: "https://yourthoughts.rockingham.wa.gov.au/",
    website: "https://rockingham.wa.gov.au/",
    scrapeUrl: "https://yourthoughts.rockingham.wa.gov.au/",
    postcodes: ["6167", "6168", "6169", "6171", "6172", "6173", "6174", "6175", "6176", "6180", "6181", "6182"],
    suburbs: ["Rockingham", "Baldivis", "Port Kennedy", "Secret Harbour", "Waikiki", "Warnbro", "Safety Bay", "Golden Bay", "Cooloongup", "Karnup", "Hillman", "Shoalwater", "Singleton"],
    aliases: [],
    representatives: {
      council: {
        label: "City of Rockingham Council",
        mayorUrl: "https://rockingham.wa.gov.au/your-city/council/your-city-council-council-members",
        councillorsUrl: "https://rockingham.wa.gov.au/your-city/council/your-city-council-council-members",
        contactUrl: "https://rockingham.wa.gov.au/your-city/contact-us",
        phone: "08 9528 0333"
      },
      state: { electorate: "Rockingham", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Brand", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "busselton",
    name: "City of Busselton",
    engagementUrl: "https://yoursay.busselton.wa.gov.au/",
    website: "https://www.busselton.wa.gov.au/",
    scrapeUrl: "https://yoursay.busselton.wa.gov.au/",
    postcodes: ["6280", "6281", "6284", "6285", "6286"],
    suburbs: ["Busselton", "Dunsborough", "Yallingup", "Vasse", "Broadwater", "West Busselton", "Yalyalup", "Quindalup"],
    aliases: [],
    representatives: {
      council: {
        label: "City of Busselton Council",
        mayorUrl: "https://www.busselton.wa.gov.au/council/about-council/elected-members.aspx",
        councillorsUrl: "https://www.busselton.wa.gov.au/council/about-council/elected-members.aspx",
        contactUrl: "https://www.busselton.wa.gov.au/contact-us",
        phone: "08 9781 0444"
      },
      state: { electorate: "Vasse", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Forrest", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "kalgoorlie-boulder",
    name: "City of Kalgoorlie-Boulder",
    engagementUrl: "https://yoursay.ckb.wa.gov.au/",
    website: "https://www.ckb.wa.gov.au/",
    scrapeUrl: "https://yoursay.ckb.wa.gov.au/",
    postcodes: ["6430", "6432", "6433", "6434", "6436", "6438", "6440"],
    suburbs: ["Kalgoorlie", "Boulder", "South Kalgoorlie", "Hannans", "Lamington", "Williamstown", "Kalgoorlie-Boulder"],
    aliases: ["kgb", "kalgoorlie boulder"],
    representatives: {
      council: {
        label: "City of Kalgoorlie-Boulder Council",
        mayorUrl: "https://www.ckb.wa.gov.au/our-city/council/councillors",
        councillorsUrl: "https://www.ckb.wa.gov.au/our-city/council/councillors",
        contactUrl: "https://www.ckb.wa.gov.au/contact-us",
        phone: "08 9021 9600"
      },
      state: { electorate: "Kalgoorlie", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "O'Connor", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "wanneroo",
    name: "City of Wanneroo",
    engagementUrl: "https://yoursay.wanneroo.wa.gov.au/",
    website: "https://www.wanneroo.wa.gov.au/",
    scrapeUrl: "https://yoursay.wanneroo.wa.gov.au/",
    postcodes: ["6030", "6031", "6032", "6033", "6034", "6035", "6036", "6037", "6038", "6065", "6069", "6076", "6077", "6078"],
    suburbs: [
      "Wanneroo", "Clarkson", "Butler", "Mindarie", "Quinns Rocks", "Yanchep", "Two Rocks", "Carramar", "Tapping",
      "Ashby", "Sinagra", "Alkimos", "Eglinton", "Merriwa", "Ridgewood", "Landsdale", "Darch", "Madeley", "Alexander Heights", "Girrawheen"
    ],
    aliases: [],
    representatives: {
      council: {
        label: "City of Wanneroo Council",
        mayorUrl: "https://www.wanneroo.wa.gov.au/info/20205/",
        councillorsUrl: "https://www.wanneroo.wa.gov.au/info/20205/",
        contactUrl: "https://www.wanneroo.wa.gov.au/contactus",
        phone: "08 9405 5000"
      },
      state: { electorate: "Wanneroo", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Pearce", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "stirling",
    name: "City of Stirling",
    engagementUrl: "https://www.stirling.wa.gov.au/city-and-council/shaping-our-city",
    website: "https://www.stirling.wa.gov.au/",
    scrapeUrl: "https://www.stirling.wa.gov.au/city-and-council/shaping-our-city",
    postcodes: ["6017", "6018", "6019", "6020", "6021", "6022", "6023", "6025", "6027", "6050", "6059", "6061", "6062", "6063", "6064"],
    suburbs: ["Stirling", "Scarborough", "Innaloo", "Osborne Park", "Balcatta", "Dianella", "Mirrabooka", "Nollamara", "Karrinyup", "Gwelup", "Hamersley", "Carine", "Trigg", "Watermans Bay", "Joondanna", "Tuart Hill"],
    aliases: [],
    representatives: {
      council: {
        label: "City of Stirling Council",
        mayorUrl: "https://www.stirling.wa.gov.au/city-and-council/about-council/mayor-and-councillor-profiles",
        councillorsUrl: "https://www.stirling.wa.gov.au/city-and-council/about-council/mayor-and-councillor-profiles",
        contactUrl: "https://www.stirling.wa.gov.au/city-and-council/contact-us",
        phone: "08 9205 8555"
      },
      state: { electorate: "Varies by suburb", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Varies by suburb", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  },
  {
    id: "joondalup",
    name: "City of Joondalup",
    engagementUrl: "https://www.joondalup.wa.gov.au/community-and-spaces/community-consultation",
    website: "https://www.joondalup.wa.gov.au/",
    scrapeUrl: "https://www.joondalup.wa.gov.au/community-and-spaces/community-consultation",
    postcodes: ["6027", "6028", "6030", "6065", "6068", "6069", "6076", "6077"],
    suburbs: ["Joondalup", "Currambine", "Kinross", "Burns Beach", "Iluka", "Heathridge", "Mullaloo", "Ocean Reef", "Edgewater", "Beldon"],
    aliases: [],
    representatives: {
      council: {
        label: "City of Joondalup Council",
        mayorUrl: "https://www.joondalup.wa.gov.au/city-and-council/council-and-committee-meetings/our-elected-members",
        councillorsUrl: "https://www.joondalup.wa.gov.au/city-and-council/council-and-committee-meetings/our-elected-members",
        contactUrl: "https://www.joondalup.wa.gov.au/contact-us",
        phone: "08 9400 4000"
      },
      state: { electorate: "Joondalup", findMpUrl: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembers?OpenView" },
      federal: { electorate: "Moore", findMpUrl: "https://electorate.aec.gov.au/" }
    }
  }
];

function normalizeLookupText(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function findWaCouncils(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (/^\d{4}$/.test(trimmed)) {
    return waCouncilRegistry.filter((council) => council.postcodes.includes(trimmed));
  }

  const normalized = normalizeLookupText(trimmed);
  return waCouncilRegistry.filter((council) => {
    const names = [council.name, ...council.suburbs, ...council.aliases].map(normalizeLookupText);
    return names.some((name) => name === normalized || name.includes(normalized) || normalized.includes(name));
  });
}

function getCouncilById(id) {
  return waCouncilRegistry.find((council) => council.id === id) || null;
}

window.WaCouncilLookup = {
  councils: waCouncilRegistry,
  findWaCouncils,
  getCouncilById,
  walgaDirectoryUrl: "https://walga.asn.au/your-local-government/local-government-directory"
};
