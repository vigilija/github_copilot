# Repository guidance

## Project layout and architecture

- This repository is both a Copilot workshop and an Astro application scaffold. The workshop guides contributors through building the app; its lessons and localized copies live under `workshop/`.
- The Astro application uses file-based routing under `src/pages/`. `src/pages/index.astro` is the contribution battle page, and `src/pages/api/contributions/[username].ts` is the same-origin contribution API route. The API proxies GitHub's HTTPS contribution endpoint and uses the shared cache adapter in `src/lib/contribution-cache.ts`; the request behavior is implemented in `src/lib/contribution-proxy.ts`.
- `astro.config.mjs` configures server output with the standalone `@astrojs/node` adapter. Keep that deployment model in mind when changing API routes.
- GitHub Pages is a separate, static publication path: `.github/workflows/deploy.yml` copies `docs/` and selected workshop content into the Pages artifact. It does not build or deploy the Astro app. See the deployment notes in `README.md` before changing either deployment path.
- Localization is automated by `.github/workflows/localization-sync.yml` and validated/mapped by `scripts/localization_sync.py`. Supported locales are `es`, `pt_BR`, and `ko`; source documents are limited to the README, selected docs pages, and English workshop Markdown. Preserve the script's source mappings and per-locale fingerprint state under `localizations/`.
- `.vscode/mcp.json` configures the Playwright MCP server for browser-based checks; VS Code may ask you to trust or start it.

## Commands

Run from the repository root:

```sh
npm ci
npm run dev       # Start the Astro development server
npm run build     # Build the Astro app
npm run preview   # Preview the built Astro app
```

Use `npm run lint`, `npm test`, and `npm run build` to validate changes. The contribution proxy tests are in `tests/`; use `npx tsc --noEmit` for an additional TypeScript check.

The shared contribution cache uses Redis when `REDIS_URL` is configured. If Redis is not configured or is unavailable, the API falls back to an uncached upstream fetch.

## Design guide: retro arcade theme

Use the contribution battle page in `src/pages/index.astro` as the source of truth for the visual theme:

- **Colors:** near-black navy background `#0a0a1a`; panels `#111126` and `#17172f`; neon green `#5fed83`; neon purple `#8a2be2`; primary text `#f3f4ff`; muted text `#aaaac4`. Use green and purple for borders, focus states, gradients, and restrained glow effects. Contribution squares use the GitHub palette supplied by the API.
- **Fonts:** use Press Start 2P for the arcade UI, with `"Courier New", monospace` as fallback. Keep the date/count tooltip in a readable system font. The display font is intentionally pixelated, so keep supporting copy short and maintain comfortable spacing.
- **Atmosphere:** retain subtle, fixed CRT scanlines behind the content. Decorative overlays must use `pointer-events: none` and must not reduce text or control legibility.
- **Animation style:** use restrained neon glow pulses, green-to-purple gradient shifts, short staggered float-ins, a brief result-card shimmer, and a small contribution-square scale/glow on hover. Keep movement subtle and avoid continuous motion on large content areas.
- **Loading and interaction:** animate loading status between green and purple while a request is active. Keep keyboard focus clearly visible and preserve hover tooltips for contribution dates and counts.
- **Accessibility and responsiveness:** honor `prefers-reduced-motion: reduce` by disabling or minimizing decorative animations and transitions. Keep the battle form and results usable at narrow widths; preserve the existing responsive stacking behavior.

## Code conventions

- Astro pages and endpoints follow Astro's file-based route structure. Dynamic route segments use bracketed filenames, such as `[username].ts`; API handlers use Astro's `APIRoute` type.
- API endpoints that must execute at request time need prerendering disabled; the contributions route currently declares `export const prerender = false`.
- Keep workshop source content in English and its translated copies in the matching locale subdirectories. When changing supported source documents, preserve the localization workflow's canonical paths and state files.
- Keep GitHub Pages changes scoped to the static content it currently publishes. Changes to the Astro app's runtime or routes do not automatically affect the Pages site.
