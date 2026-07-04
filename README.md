# Fleet website

Official product website for Fleet, a local-first multi-instance launcher and account manager for Roblox on Windows.

This website lives in its own repository so the Fleet desktop application source remains unchanged.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Validate and build

```bash
npm test
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. In the GitHub repository:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run the workflow manually.

The workflow installs locked dependencies, validates the site, builds all pages, and deploys `dist/`.

## Pages

- `index.html` — product overview and interactive Fleet simulation
- `features.html` — capabilities and interactive Server Intelligence lab
- `docs.html` — install and usage documentation
- `download.html` — release, requirements, verification, and installation
- `changelog.html` — recent release history

## Source material

Copy and technical claims are derived from Fleet's README, user guide, technical documentation, release history, and real application screenshots. The demo is explicitly labeled as simulated and never connects to a Roblox account.

