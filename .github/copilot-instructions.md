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

## Code conventions

- Astro pages and endpoints follow Astro's file-based route structure. Dynamic route segments use bracketed filenames, such as `[username].ts`; API handlers use Astro's `APIRoute` type.
- API endpoints that must execute at request time need prerendering disabled; the contributions route currently declares `export const prerender = false`.
- Keep workshop source content in English and its translated copies in the matching locale subdirectories. When changing supported source documents, preserve the localization workflow's canonical paths and state files.
- Keep GitHub Pages changes scoped to the static content it currently publishes. Changes to the Astro app's runtime or routes do not automatically affect the Pages site.
