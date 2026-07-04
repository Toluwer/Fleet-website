# Fleet website

Original one-page GitHub project showcase for Fleet, a local-first multi-instance launcher and account manager for Roblox on Windows.

This website lives in its own repository so the Fleet desktop application source remains unchanged.

## Run locally

```bash
npm install
npm run dev
```

## Validate and build

```bash
npm test
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. Set the repository's Pages source to GitHub Actions, then push `main` or run the workflow manually.

## Page

`index.html` is a single original project page with a live Fleet simulation, capability overview, real app screenshots, an architecture summary, and links to the source repository.

Copy and technical claims are derived from Fleet 1.5.2's README, technical documentation, release metadata, and real application screenshots. The browser demo is explicitly simulated and never connects to a Roblox account.
