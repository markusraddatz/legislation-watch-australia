# Legislation Watch Australia

**Live site:** [legislation-watch-australia.pages.dev](https://legislation-watch-australia.pages.dev)  
**Repository:** [github.com/markusraddatz/legislation-watch-australia](https://github.com/markusraddatz/legislation-watch-australia)

An independent, neutral tool for Australian **legislation and public consultation transparency**. This is a fully static site (HTML, CSS, JavaScript) — no backend, no user accounts, and no discussion features.

Legislation Watch helps citizens find **what is open for public input right now** and **what has recently been decided**, with every item linking to official government and parliamentary sources. It does not advocate for or against any policy.

## Quick start (local)

```bash
cd legislation-watch
npx serve .
```

Then open the URL shown (usually `http://localhost:3000`). Alternatively, open `index.html` directly in a browser.

**Script load order (main page):** `data/real-data.js` → `js/app.js`  
**Local gov page:** `data/local-data.js` → `data/wa-council-lookup.js` → `js/local.js`

No build step or `npm install` is required to run or deploy the site.

**Redeploy after data updates:**

```bash
npm run deploy
```

Or: `wrangler pages deploy . --project-name=legislation-watch-australia`

## Project structure

```
├── index.html              # Main page (federal + state/territory)
├── local.html              # Local government / council consultations
├── favicon.svg
├── robots.txt
├── css/styles.css
├── js/
│   ├── app.js              # Main page rendering and filtering
│   └── local.js            # Local gov page
├── data/
│   ├── real-data.js        # Federal + state/territory consultations (live data)
│   ├── local-data.js       # All eight jurisdictions — council / local gov items
│   ├── wa-council-lookup.js
│   ├── source-registry.js  # Canonical source URLs and refresh checklist
│   └── sample-data.js      # Fictional demo data (optional; not used in production)
├── wrangler.toml           # Optional — for CLI deploy only; not required for Git → Pages
├── DEPLOY.md               # Step-by-step GitHub + Cloudflare Pages guide
└── README.md
```

## Data files

All live content is stored in JavaScript data files and loaded in the browser. **Data is updated manually** from official government sources — never invented or scraped without verification.

### `data/real-data.js` (main site)

Exposes `window.LegislationWatchData` with:

| Field | Purpose |
|-------|---------|
| `lastUpdated` | ISO date (`YYYY-MM-DD`) — shown as “Data last updated” on the home page |
| `upcomingItems` | Federal bills, inquiries, and consultations with open submission windows |
| `pastItems` | Recently decided legislation with outcomes |
| `stateCoverage` | State/territory consultations and official portal links |

Each **upcoming** item includes `title`, `jurisdiction`, `type`, `status`, `shortNeutralSummary`, `keyDates`, `officialLinks` (with **`howToParticipate`** — required absolute URL), `participantInfo`, and `topics`.

To refresh: edit items, remove closed consultations, set `lastUpdated` and the `LAST UPDATED` comment at the top of the file. See **Refreshing data** below and `data/source-registry.js`.

### `data/local-data.js` (local gov page)

Exposes `window.LocalGovWatchData` with:

| Field | Purpose |
|-------|---------|
| `lastUpdated` | ISO date — shown on `local.html` |
| `localCoverage.states[]` | One entry per jurisdiction: `NSW`, `VIC`, `QLD`, `WA`, `SA`, `TAS`, `ACT`, `NT` |

Each state/territory block has:

- `items[]` — verified open council/regional consultations (may be empty)
- `integrated` — `true` only when `items` contains verified open consultations; `false` when empty
- `portals[]` — official engagement hub links
- `note` — coverage message for that jurisdiction

Local items use the same core fields as federal items, plus `councilId` and `council`. All `officialLinks.howToParticipate` values must be absolute URLs to real official pages.

## Content focus (75 / 25)

| Share | Focus |
|-------|--------|
| **75%** | **Upcoming decisions** — active consultation or submission windows with closing dates and participation links |
| **25%** | **Past and recent decisions** — how legislation was resolved, plus submission counts when publicly reported |

## Deploying to Cloudflare Pages

The site is **100% static** — no server-side code, no build command, no secrets on the live site.

**Recommended Cloudflare Pages settings:**

| Setting | Value |
|---------|--------|
| Framework preset | **None** (or Static HTML) |
| Build command | *(leave empty)* |
| Build output directory | **`/`** |
| Root directory | **`/`** (repository root where `index.html` lives) |

**Free tier** is sufficient: unlimited bandwidth for static assets, unlimited requests, and 500 builds/month.

### Deployment steps (summary)

1. Push this folder to a GitHub repository (repo root = project root).
2. In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo, set the build settings above, and deploy.
4. Optionally add a custom domain under **Custom domains**.

Full instructions with exact commands: **[DEPLOY.md](DEPLOY.md)**

`wrangler.toml` is included for optional CLI deploy (`wrangler pages deploy .`) but is **not required** when using GitHub integration.

## Refreshing data (manual workflow)

1. Open sources in `REFRESH_CHECKLIST` inside `data/source-registry.js`.
2. For each open consultation, record the exact title, jurisdiction, close date, and **`howToParticipate`** URL from the official page.
3. Remove items whose submission windows have closed.
4. Update `lastUpdated` in `data/real-data.js` and/or `localLastUpdated` in `data/local-data.js`.
5. Commit and push — Cloudflare Pages redeploys automatically.

The UI reads these timestamps automatically; no HTML changes needed.

## Official data sources

All items must come from official sources listed in `data/source-registry.js` and summarized here. **Never invent data.** If submission counts are not published, set `participantInfo` to `null`.

### Federal

- [APH — Inquiries accepting submissions](https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Open)
- [APH — Submissions closing soon](https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Closing)
- [Treasury consultations](https://consult.treasury.gov.au/)
- [Attorney-General consultations](https://consultations.ag.gov.au/)
- [Federal Register of Legislation](https://www.legislation.gov.au/) (past items)

### State and territory

- **NSW:** [NSW Have Your Say](https://www.nsw.gov.au/have-your-say)
- **VIC:** [Engage Victoria](https://engage.vic.gov.au/)
- **QLD:** [Get Involved Queensland](https://www.getinvolved.qld.gov.au/)
- **WA:** [Have Your Say — DPLH](https://haveyoursay.dplh.wa.gov.au/)
- **SA:** [YourSAy](https://yoursay.sa.gov.au/)
- **TAS:** [State Planning — Have Your Say](https://www.stateplanning.tas.gov.au/have-your-say)
- **ACT:** [YourSay Conversations](https://www.yoursayconversations.act.gov.au/)
- **NT:** [NT Have Your Say](https://haveyoursay.nt.gov.au/)

### Local government

Council consultations live on [`local.html`](local.html). All eight jurisdictions are defined in `data/local-data.js`. WA includes postcode/suburb council lookup via `data/wa-council-lookup.js`.

## Disclaimer

This site is an independent informational project. Always verify dates, text, and submission requirements on official government websites before acting. Content is for reference only — not legal advice.
