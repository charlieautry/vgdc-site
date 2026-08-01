# Editing the VGDC Website (no code needed)

The site is edited at **https://REPLACE-WITH-SITE-URL/admin** — a form-based editor.
Every save automatically publishes the change to the live site in ~2 minutes.

## Logging in

1. You need a GitHub account that has been added as a **collaborator** on the
   `charlieautry/vgdc-site` repo (ask the current maintainer to add you:
   GitHub repo → Settings → Collaborators).
2. Go to `/admin` and click **Sign in with GitHub**.

**If the GitHub button is broken** (backup method): click **Sign in with Token**
instead. Follow the link it shows to create a GitHub "personal access token",
paste it in, and you're in.

## What you can edit

| Section in the editor | What it controls |
|---|---|
| Site Settings | Scrolling red banner (text, link, on/off) and where the navbar Game Jam logo links |
| Events | The event cards on the home page (past-dated events hide automatically) |
| Important Events | The big carousel at the top of the home page |
| Resources | Everything on the Resources page |
| Footer FAQ | The questions at the bottom of every page |
| About Page | Officer cards and the "What is VGDC?" text sections |
| Game Jams | The Past Jams page — **to add a new jam, click "New Game Jam"**, fill in the title, sort date (e.g. `2026-12`), the itch.io results link, and add each submission |

## Photos

- **Gallery** (About page slideshow): open the **Assets** section in the editor
  and upload images into `images/gallery`. They appear after the next build.
- **Event flyers / jam covers / headshots**: use the image field on the entry
  itself — it uploads for you.

## Dates and times

- Event dates must look like `2026-09-03` (year-month-day). Times like `4:30 PM`.
- Events disappear from the home page automatically once they've ended.
- **An event with a blank date never shows on the home page** — always fill in
  the date if you want the card visible.

## Fixing mistakes

Every save is tracked. To undo one:
1. Go to https://github.com/charlieautry/vgdc-site/commits/main
2. Open the bad change, click the `...` menu → **Revert changes** (or ask
   someone comfortable with GitHub).
3. The site rebuilds itself after the revert.

## If the site stops updating

Builds run at https://github.com/charlieautry/vgdc-site/actions — a red X means
a build failed and the live site is simply showing the last good version
(nothing is broken publicly). Revert the most recent change (see above) and it
will recover. If the deploy fails with an authentication error, the Cloudflare
API token may have been revoked — a maintainer needs to create a new one
(Cloudflare dashboard → My Profile → API Tokens → "Edit Cloudflare Workers"
template) and update the `CLOUDFLARE_API_TOKEN` secret in
GitHub repo → Settings → Secrets and variables → Actions.
