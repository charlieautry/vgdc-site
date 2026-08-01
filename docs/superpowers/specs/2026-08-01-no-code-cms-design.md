# No-Code Content Editing for the VGDC Site — Design Spec

**Date:** 2026-08-01
**Status:** Approved design, pending implementation plan

## Goal

Make every piece of site content editable by club officers with no code, no cost,
and no ongoing maintenance burden, so the site stays current while the original
maintainer is away. Officers edit through a browser form UI; changes go live
automatically within minutes.

## Current State

- Next.js 16 static export (`output: 'export'`), deployed to Cloudflare as static
  assets via `wrangler deploy` run manually from the maintainer's machine.
- No server, no database, no CI.
- All content is hardcoded in the repo:
  - Events: `app/data/events.ts`
  - Important events: `app/data/importantEvents.ts`
  - Resources: `app/data/resources.ts`
  - Game jam entries: hardcoded in `app/past-jams/page.tsx`
  - Game jam itch.io link: hardcoded in `app/Navigation.tsx`
  - Scrolling banner text: hardcoded in `app/page.tsx`
  - Footer FAQ: hardcoded in `app/components/Footer.tsx`
  - About page prose: hardcoded in `app/about/page.tsx`
  - Gallery: auto-generated at build time by `scripts/generate-gallery.js` from
    `public/images/gallery/`

## Decision

Git-based CMS: **Sveltia CMS** served at `/admin`, content stored as JSON files
in the repo, GitHub OAuth sign-in via the `sveltia-cms-auth` Cloudflare Worker,
automatic deploys via GitHub Actions.

No database. Content-as-files in git provides version history, free hosting,
and keeps the existing static-export deployment unchanged. SQLite/D1 would
require a server runtime, an API layer, and self-maintained auth — the opposite
of low-maintenance.

### Why Sveltia (verified 2026-08-01)

- Production-ready (~v0.113), v1.0 GA expected early 2026; has resolved 275+
  issues inherited from Decap/Netlify CMS; ~300KB frontend vs Decap's ~1.5MB.
- Decap CMS is community-maintained with slow security response (moderate XSS
  reported Sept 2025 unpatched; Jan 2026 proxy vulnerability took >1 month to
  ship). Decap is retained only as an emergency fallback: Sveltia reads Decap
  `config.yml` format, so falling back is a one-line script-tag swap in
  `public/admin/index.html`.
- Keystatic (the strongest alternative) requires server routes for its GitHub
  mode, which conflicts with `output: 'export'`. Sveltia is two static files in
  `public/` — zero impact on the build.
- Hosted headless CMSs (Sanity, Contentful) move content off-repo and add a
  vendor dependency; unnecessary at club scale.

## Architecture

### 1. Content layer

All content moves to a `content/` folder of JSON files, imported by pages at
build time (`resolveJsonModule`). The rendered site is pixel-identical after
migration.

| File | Replaces | Shape |
|---|---|---|
| `content/events.json` | `app/data/events.ts` | list of Event objects (existing interface) |
| `content/important-events.json` | `app/data/importantEvents.ts` | list of ImportantEvent objects |
| `content/resources.json` | `app/data/resources.ts` | list of Resource objects with tags |
| `content/jams/<jam-name>.json` | hardcoded arrays in `app/past-jams/page.tsx` | one file per jam: jam title, semester, ordered list of entries (title, author, image, itch link). Adding a new jam = creating a new file in the CMS, no code. |
| `content/faq.json` | FAQ array in `Footer.tsx` | list of question/answer pairs |
| `content/settings.json` | strings in `page.tsx` / `Navigation.tsx` | singletons: scrolling banner text, game jam itch.io URL, jam registration banner on/off, other one-off strings |
| `content/about.json` | prose in `app/about/page.tsx` | ordered list of sections (heading, body, optional image) — officers can add/remove/reorder sections |
| `content/officers.json` | officer cards in `app/about/page.tsx` | ordered list of officers (name, role, major, year, headshot image) — covers yearly officer turnover without code |

Gallery pipeline is unchanged: officers upload images through the CMS media
library into `public/images/gallery/`; `generate-gallery.js` runs during the CI
build and regenerates `app/data/gallery.ts`.

TypeScript interfaces for content shapes remain in `app/data/` (types only,
no data) so pages keep compile-time checking against the JSON.

### 2. Admin UI

- `public/admin/index.html` — loads Sveltia CMS (pinned version) from CDN.
- `public/admin/config.yml` — declares every collection above with friendly
  labels, date pickers, image widgets, and required-field validation so a
  half-empty event cannot be saved.
- Media library configured to commit uploads into `public/images/`.

### 3. Authentication

- **Primary:** GitHub OAuth via the `sveltia-cms-auth` Cloudflare Worker
  (one-click deploy; register a GitHub OAuth App; set client ID/secret as
  Worker env vars; point `base_url` in `config.yml` at the Worker).
- **Access control:** repo collaborator list on GitHub. Adding/removing an
  officer = adding/removing a collaborator. No separate user database.
- **Fallback (documented in handoff doc):** Sveltia's native "Sign in with
  Token" — an officer generates a GitHub personal access token from a
  pre-filled link and signs in with zero infrastructure. Covers the case
  where the OAuth Worker breaks while the maintainer is away.
- **Future simplification:** GitHub plans client-side PKCE for SPAs; once
  Sveltia adopts it, the Worker can be deleted.

### 4. Deploys (CI)

GitHub Actions workflow `.github/workflows/deploy.yml`:
on push to `main` → checkout → `npm ci` → `npm run build` (which runs
`generate-gallery.js` then `next build`) → `wrangler deploy`, authenticated
with a `CLOUDFLARE_API_TOKEN` repo secret. This both closes the current
"deploys only from maintainer's machine" gap and makes CMS saves go live
automatically (~2 minutes after save).

### 5. Safety and undo

- Every CMS save is a git commit attributed to the officer's GitHub account —
  full history of who changed what, revertable from GitHub's web UI.
- Direct-commit mode (no PR approval step): editors are trusted officers;
  simplest workflow.
- CI build failure = site keeps serving the last good deploy; nothing breaks
  live.

### 6. Handoff documentation

`EDITING.md` in the repo root, one page:
- How to log in at `/admin` (and the PAT fallback).
- How to edit each content type and upload photos.
- How to revert a mistake from GitHub's web UI.
- What a failed deploy looks like and what to do (revert the commit).

## Explicitly Out of Scope

- Drag-and-drop layout/page-builder editing. Layout, styling, and new page
  types remain code. All *content* (text, images, links, lists, ordering,
  section add/remove on About) is editable.
- Editorial/approval workflow, scheduling, localization.
- Any database (SQLite, D1, hosted).

## Error Handling

- Config validation: required fields and widget types in `config.yml` prevent
  malformed saves at the source.
- Pages must render gracefully when optional fields are empty (existing
  behavior, preserved — e.g. `image: "None"` convention on important events
  is replaced by an optional image field).
- Build failures surface in GitHub Actions; last good deploy stays live.

## Testing / Success Criteria

1. After content migration, `npm run build` succeeds and the exported site is
   visually identical to the current site.
2. End-to-end: log in at `/admin` with GitHub, edit an event, confirm the
   change deploys automatically and appears live.
3. Image upload via CMS media library appears in the gallery after the
   triggered build.
4. PAT fallback sign-in verified once.
5. A non-maintainer officer completes an edit using only `EDITING.md`.

## Risks

| Risk | Mitigation |
|---|---|
| Sveltia is pre-1.0 | Pin the CDN version; config is Decap-compatible, so fallback is a one-line swap |
| OAuth Worker breaks while maintainer is away | Documented PAT sign-in fallback requires zero infrastructure |
| Officer commits break the build | Config validation prevents most; failed builds don't affect the live site; revert instructions in EDITING.md |
| Cloudflare API token expiry/rotation | Note token settings in EDITING.md; choose non-expiring token scoped to the one zone |
