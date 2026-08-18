# Deploy Legislation Watch Australia

Step-by-step guide for **GitHub** + **Cloudflare Pages** (free tier).

## Prerequisites

- A [GitHub](https://github.com) account
- A [Cloudflare](https://dash.cloudflare.com/sign-up) account (free)
- [Git](https://git-scm.com/) installed locally

The site is **100% static** (HTML, CSS, JavaScript). No build step, no server, no environment variables required for the live site.

---

## 1. Create the GitHub repository

This project is already published at:

- **GitHub:** https://github.com/markusraddatz/legislation-watch-australia
- **Live site:** https://legislation-watch-australia.pages.dev

To clone elsewhere:

```bash
git clone https://github.com/markusraddatz/legislation-watch-australia.git
cd legislation-watch-australia
```

### Option A — New repository (for your own fork)

Skip this if you are using the repo above.

1. On GitHub, click **New repository**.
2. Name it e.g. `legislation-watch-australia`.
3. Leave it **empty** (no README, no `.gitignore` — this project already includes them).
4. Copy the repository URL, e.g. `https://github.com/YOUR_USERNAME/legislation-watch-australia.git`.

### Option B — Existing repository

Use your existing remote URL instead of the example below.

---

## 2. Push code from your machine

Open a terminal in the **project root** (the folder that contains `index.html`):

```bash
cd path/to/legislation-watch

git init
git add .
git commit -m "Initial commit — Legislation Watch Australia static site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/legislation-watch-australia.git
git push -u origin main
```

Replace `YOUR_USERNAME` and the repo name with yours.

**Repository layout:** The Git repository root should be this folder (`index.html` at the repo root). Do not nest it inside another directory unless you set Cloudflare’s **Root directory** accordingly.

---

## 3. Connect GitHub to Cloudflare Pages

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select your repository.
4. Configure the build:

| Setting | Value |
|--------|--------|
| **Production branch** | `main` |
| **Framework preset** | None (or Static HTML) |
| **Build command** | *(leave empty)* |
| **Build output directory** | `/` |
| **Root directory** | `/` *(or leave default if repo root is the project)* |

5. Click **Save and Deploy**.

Cloudflare uploads the files and serves them from its CDN. The first deploy usually completes in under a minute.

---

## 4. Verify the deployment

After deploy succeeds, open the `*.pages.dev` URL Cloudflare provides. Check:

- [ ] Home page loads (`index.html`)
- [ ] Local gov page loads (`/local.html`)
- [ ] “Data last updated” appears on both pages
- [ ] External “How to participate” links open official government sites

---

## 5. Custom domain (optional)

1. In Cloudflare Pages → your project → **Custom domains**.
2. Click **Set up a custom domain** and enter your domain (e.g. `legislationwatch.au`).
3. Follow the DNS instructions (Cloudflare can manage DNS if the domain is on Cloudflare).
4. Update `robots.txt` `Sitemap:` URL if you add a sitemap later.

HTTPS is provisioned automatically.

---

## 6. Updating the live site

Data is updated manually in the repo (see README **Refreshing data**):

1. Edit `data/real-data.js` and/or `data/local-data.js`.
2. Set `lastUpdated` / `localLastUpdated` to today’s date (`YYYY-MM-DD`).
3. Commit and push to `main`:

```bash
git add data/real-data.js data/local-data.js
git commit -m "Update consultation data"
git push
npm run deploy
```

The project is deployed to Cloudflare Pages via Wrangler (`npm run deploy`). To enable **automatic deploy on every push**, connect the GitHub repo under Cloudflare Pages → **Settings** → **Builds & deployments** → **Connect to Git** (framework preset: None, build command empty, output directory `/`).

---

## Free tier notes

Cloudflare Pages free tier includes:

- Unlimited bandwidth for static assets
- Unlimited requests
- 500 builds per month
- Automatic HTTPS on `*.pages.dev` and custom domains

No credit card is required for the free plan.

---

## CLI deploy (alternative)

If you prefer not to use Git integration:

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=legislation-watch-australia
```

The included `wrangler.toml` sets `pages_build_output_dir = "."` for this layout.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on `/local.html` | Ensure **Build output directory** is `/`, not `dist` or `public`. |
| Blank consultation list | Confirm `data/real-data.js` is committed and loads before `js/app.js` in `index.html`. |
| Old data after push | Check the latest Pages deployment succeeded; hard-refresh the browser. |
| Repo in a subfolder | Set Cloudflare **Root directory** to that subfolder (e.g. `legislation-watch`). |

For project structure and data rules, see [README.md](README.md).
