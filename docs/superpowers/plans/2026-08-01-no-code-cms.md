# No-Code CMS (Sveltia) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all VGDC site content editable by non-coders via Sveltia CMS at `/admin`, with automatic Cloudflare deploys on every save.

**Architecture:** Content migrates from hardcoded TS/TSX into `content/*.json` files that pages import at build time (thin re-export modules keep most page code unchanged). Sveltia CMS (two static files in `public/admin/`) edits those JSON files by committing to GitHub; a GitHub Actions workflow rebuilds and deploys to Cloudflare on push. Auth is GitHub OAuth via the `sveltia-cms-auth` Cloudflare Worker, with PAT sign-in as a documented fallback.

**Tech Stack:** Next.js 16 static export (`output: 'export'`), Tailwind 4, Sveltia CMS (pinned CDN version), GitHub Actions, Cloudflare Workers (static assets + auth worker).

**Spec:** `docs/superpowers/specs/2026-08-01-no-code-cms-design.md`

**Verification approach:** This repo has no test framework, and adding one for a content migration is YAGNI. The verification analog used throughout: `npm run build` must succeed, and `grep` checks against the exported HTML in `out/` must confirm the migrated content still renders. Run all commands from the repo root with the Bash tool (Git Bash on Windows).

**Important:** `app/data/events.ts` and `app/data/importantEvents.ts` have uncommitted working-tree changes (the summer placeholder content). That working-tree content is the source of truth for migration — Tasks 1's JSON files carry those values, and the task's commit subsumes those pending changes. Do NOT `git checkout` or discard them.

---

### Task 1: Migrate events + important events to JSON

**Files:**
- Create: `content/events.json`
- Create: `content/important-events.json`
- Modify: `app/data/events.ts`
- Modify: `app/data/importantEvents.ts`
- Modify: `app/page.tsx:115` (image `"None"` check becomes truthy check)

- [ ] **Step 1: Capture a pre-migration baseline**

Run: `npm run build && grep -c "REGISTER TO BE A MEMBER" out/index.html`
Expected: build succeeds; grep prints `1` (the banner text appears; there are 10 spans but grep -c counts lines). If the build fails BEFORE any changes, stop and report — the baseline is broken.

- [ ] **Step 2: Create `content/events.json`**

The `items` array holds exactly the objects currently in the `events` array of `app/data/events.ts` (working tree). As of writing:

```json
{
  "items": [
    {
      "type": "Summer Break",
      "title": "No Meeting",
      "desc": "Enjoy your break!",
      "date": "",
      "time": "",
      "endTime": "",
      "location": "N/A"
    }
  ]
}
```

If the working-tree file differs from the above, migrate what the file actually contains — copy every object field-for-field.

- [ ] **Step 3: Create `content/important-events.json`**

Same rule: migrate the current `importantEvents` array. One change: the `image: "None"` sentinel becomes an empty string `""` (the CMS uses an optional image field; empty means no image). As of writing:

```json
{
  "items": [
    {
      "title": "Have a Great Summer!",
      "image": "",
      "description": "That's a wrap on the semester! Thanks to everyone who came out this year. Have a fantastic summer, and we'll see you in the fall!",
      "date": "Summer 2026",
      "link": "",
      "linkText": ""
    }
  ]
}
```

- [ ] **Step 4: Convert `app/data/events.ts` to a thin JSON re-export**

Replace the entire file with:

```typescript
import eventsJson from '@/content/events.json';

export interface Event {
  type: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  image?: string;
}

export const events: Event[] = eventsJson.items as Event[];
```

This keeps the `import { events, Event } from './data/events'` statement in `app/page.tsx` working unchanged.

- [ ] **Step 5: Convert `app/data/importantEvents.ts` to a thin JSON re-export**

Replace the entire file with:

```typescript
import importantEventsJson from '@/content/important-events.json';

export interface ImportantEvent {
  title: string;
  image: string;
  description: string;
  date: string;
  link?: string;
  linkText?: string;
}

export const importantEvents: ImportantEvent[] =
  importantEventsJson.items as ImportantEvent[];
```

- [ ] **Step 6: Update the `"None"` image check in `app/page.tsx`**

Around line 115, change:

```tsx
{importantEvents[currentEvent].image !== "None" && (
```

to:

```tsx
{importantEvents[currentEvent].image && (
```

(Empty string is falsy, so `""` now means "no image". Any old `"None"` values were migrated to `""` in Step 3.)

- [ ] **Step 7: Verify build and rendered content**

Run: `npm run build && grep -c "Have a Great Summer" out/index.html`
Expected: build succeeds; grep prints a number ≥ 1. Also run `grep -c 'alt="None"' out/index.html || true` — expected `0` (no broken image tag rendered).

- [ ] **Step 8: Commit**

```bash
git add content/events.json content/important-events.json app/data/events.ts app/data/importantEvents.ts app/page.tsx
git commit -m "feat: move events and important events content to content/*.json"
```

Note: this intentionally includes the previously uncommitted working-tree changes to the two data files — their content now lives in the JSON.

---

### Task 2: Migrate resources to JSON

**Files:**
- Create: `content/resources.json`
- Modify: `app/data/resources.ts`

- [ ] **Step 1: Create `content/resources.json`**

Structure: `{ "items": [ ...all 32 resource objects... ] }`. Mechanically convert the `resources` array literal from `app/data/resources.ts:11-268` to strict JSON: double-quote all keys, remove trailing commas, drop the `//` comments. Every field copies verbatim (`title`, `description`, `type`, `url`, `category`, `tags`). The first entry, for shape reference:

```json
{
  "items": [
    {
      "title": "Godot Engine Documentation",
      "description": "Official documentation for the Godot game engine. Learn everything from basics to advanced features.",
      "type": "link",
      "url": "https://docs.godotengine.org/",
      "category": "Documentation",
      "tags": ["godot", "engine", "documentation"]
    }
  ]
}
```

- [ ] **Step 2: Verify the JSON parses and has all 32 entries**

Run: `node -e "const d=require('./content/resources.json'); console.log(d.items.length)"`
Expected: `32`

- [ ] **Step 3: Convert `app/data/resources.ts` to a thin JSON re-export**

Replace the entire file with:

```typescript
import resourcesJson from '@/content/resources.json';

export interface Resource {
  title: string;
  description: string;
  type: 'link' | 'youtube' | 'download';
  url: string; // For links and downloads, this is the URL. For YouTube, this is the video ID
  category: string;
  tags: string[];
  image?: string; // Optional OpenGraph image URL
}

export const resources: Resource[] = resourcesJson.items as Resource[];
```

- [ ] **Step 4: Verify build and rendered content**

Run: `npm run build && grep -c "Godot Engine Documentation" out/resources/index.html && grep -c "Shadertoy" out/resources/index.html`
Expected: build succeeds; both greps print ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add content/resources.json app/data/resources.ts
git commit -m "feat: move resources content to content/resources.json"
```

---

### Task 3: Site settings — banner + game jam link

**Files:**
- Create: `content/settings.json`
- Modify: `app/page.tsx:89-108` (scrolling banner)
- Modify: `app/Navigation.tsx:99` (game jam URL)

- [ ] **Step 1: Create `content/settings.json`**

```json
{
  "bannerText": "REGISTER TO BE A MEMBER TODAY ON CAMPUSLINK",
  "bannerUrl": "https://campuslink.okstate.edu/organization/videogamedevelopment",
  "bannerEnabled": true,
  "gameJamUrl": "https://osu-video-game-dev-club.itch.io/"
}
```

- [ ] **Step 2: Wire the scrolling banner in `app/page.tsx`**

Add the import at the top of the file (after the existing imports):

```typescript
import settings from '@/content/settings.json';
```

Replace the entire "Scrolling Banner" block (the `<a>` element at lines 89-108, containing the 10 hardcoded `<span>` lines) with:

```tsx
      {/* Scrolling Banner */}
      {settings.bannerEnabled && (
        <a
          href={settings.bannerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-8 overflow-hidden bg-red-600 py-3 hover:bg-red-700 transition-colors cursor-pointer"
        >
          <div className="animate-scroll whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-xl font-bold mx-8">{settings.bannerText}</span>
            ))}
          </div>
        </a>
      )}
```

- [ ] **Step 3: Wire the game jam link in `app/Navigation.tsx`**

Add the import at the top of the file (after the existing imports):

```typescript
import settings from '@/content/settings.json';
```

At line 99, change `href="https://osu-video-game-dev-club.itch.io/"` to:

```tsx
href={settings.gameJamUrl}
```

- [ ] **Step 4: Verify build and rendered content**

Run: `npm run build && grep -c "REGISTER TO BE A MEMBER TODAY ON CAMPUSLINK" out/index.html && grep -c "osu-video-game-dev-club.itch.io" out/index.html`
Expected: build succeeds; both greps ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add content/settings.json app/page.tsx app/Navigation.tsx
git commit -m "feat: move banner and game jam link to content/settings.json"
```

---

### Task 4: Migrate footer FAQ to JSON

**Files:**
- Create: `content/faq.json`
- Modify: `app/components/Footer.tsx:5-27`

- [ ] **Step 1: Create `content/faq.json`**

```json
{
  "items": [
    {
      "question": "When do you meet?",
      "answer": "We typically meet every Wednesday from 4:30 PM to 6:30 PM in MSCS 445, check the schedule on our home page for any changes!"
    },
    {
      "question": "Do I need experience to join?",
      "answer": "No experience needed! We welcome everyone from beginners to experienced developers."
    },
    {
      "question": "What should I bring?",
      "answer": "Just bring yourself and a laptop if you have one. We'll provide the rest!"
    },
    {
      "question": "How do I sign up for the game jam?",
      "answer": "Click the registration banner or hyperlink at the top of the home page."
    }
  ]
}
```

- [ ] **Step 2: Wire it into `app/components/Footer.tsx`**

Replace lines 5-27 (the `interface FAQ` block and the `const faqs: FAQ[] = [...]` array) with:

```typescript
import faqJson from '@/content/faq.json';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = faqJson.items;
```

(The import line goes with the other imports at the top; the rest of the component is unchanged.)

- [ ] **Step 3: Verify build and rendered content**

Run: `npm run build && grep -c "Do I need experience to join?" out/index.html`
Expected: build succeeds; grep ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add content/faq.json app/components/Footer.tsx
git commit -m "feat: move footer FAQ to content/faq.json"
```

---

### Task 5: Migrate About page (officers + prose sections) to JSON

**Files:**
- Create: `content/officers.json`
- Create: `content/about.json`
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Create `content/officers.json`**

`imageClass` is an optional advanced field for per-photo Tailwind adjustments (zoom/crop position); empty string means none. Values below preserve the current rendering exactly:

```json
{
  "items": [
    {
      "name": "Dillon Eckley",
      "role": "President",
      "major": "Applied Computer Programming",
      "year": "Sophomore",
      "image": "/images/headshots/dilloneckley.jpg",
      "imageClass": ""
    },
    {
      "name": "Christopher Knoles",
      "role": "Vice-President",
      "major": "Business Management",
      "year": "Senior",
      "image": "/images/headshots/christopherknoles.jpg",
      "imageClass": "scale-150"
    },
    {
      "name": "Jase Scott",
      "role": "Secretary",
      "major": "Computer Science",
      "year": "Junior",
      "image": "/images/headshots/jasescott.jpg",
      "imageClass": ""
    },
    {
      "name": "Nathan Livesay",
      "role": "Treasurer",
      "major": "Computer Science",
      "year": "Junior",
      "image": "/images/headshots/nathanlivesay.png",
      "imageClass": ""
    },
    {
      "name": "Joshua Price",
      "role": "Outreach",
      "major": "Computer Science",
      "year": "Senior",
      "image": "/images/headshots/joshuaprice.jpg",
      "imageClass": ""
    },
    {
      "name": "Charles Autry",
      "role": "Marketing",
      "major": "Computer Science",
      "year": "Junior",
      "image": "/images/headshots/charlesautry.JPEG",
      "imageClass": "object-[center_20%]"
    }
  ]
}
```

Tailwind 4 auto-detects classes in non-gitignored project files (JSON included), so these class strings are generated at build time. New arbitrary values typed by officers also work because every content save triggers a full CI rebuild.

- [ ] **Step 2: Create `content/about.json`**

`officersHeading` is the section title above the officer grid. `sections` each have a heading, a body (blank line = new paragraph), and an optional image:

```json
{
  "officersHeading": "25-26 Officer Team",
  "sections": [
    {
      "heading": "What is VGDC?",
      "body": "The Video Game Development Club was founded in 2015 and officially re-sponsored in 2026. We are a passionate community of game developers, designers, and enthusiasts inspired by everything videogames. For over a decade, we've been dedicated to fostering creativity, learning, and collaboration among our members.\n\nOur mission as a club is to get more people involved in game development, and we provide a large network of support and resources to help our members learn and grow. From resources and workshops to game jams and projects, there are a wide range of opportunities for members to develop their skills and connect with others who share their passion for creation.\n\nYour experience level doesn't matter - whether you're a complete beginner or an experienced developer, we welcome you to join us and be a part of our community. We believe that everyone has something valuable to contribute, and we strive to create an inclusive and supportive environment where all members can thrive.",
      "image": ""
    }
  ]
}
```

- [ ] **Step 3: Rewire `app/about/page.tsx`**

Add imports after the existing imports at the top (keep `'use client'` and all existing imports):

```typescript
import officersJson from '@/content/officers.json';
import aboutJson from '@/content/about.json';
```

Replace the entire "Officers Section" (`<section className="mb-16">` containing the six hardcoded officer cards, lines 21-122) with:

```tsx
        {/* Officers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{aboutJson.officersHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officersJson.items.map((officer) => (
              <div key={officer.name} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-[32rem] overflow-hidden relative">
                  <Image
                    src={officer.image}
                    alt={officer.name}
                    fill
                    className={`object-cover ${officer.imageClass}`.trim()}
                  />
                </div>
                <div className="p-6 bg-gray-800">
                  <h3 className="text-2xl font-bold mb-2">{officer.name}</h3>
                  <p className="text-gray-400 mb-2">{officer.role}</p>
                  <p className="text-gray-400 mb-2">{officer.major}</p>
                  <p className="text-gray-400">{officer.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
```

Replace the entire "About the Club Section" (`<section className="mb-16">` at lines 185-203) with:

```tsx
        {/* About the Club Sections */}
        {aboutJson.sections.map((section) => (
          <section key={section.heading} className="mb-16">
            <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">{section.heading}</h2>
              <div className="space-y-4 text-gray-300">
                {section.body.split(/\n\s*\n/).map((paragraph, i) => (
                  <p key={i} className="text-xl indent-8">{paragraph}</p>
                ))}
                {section.image && (
                  <div className="rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={section.heading} className="w-full h-auto" />
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
```

The gallery section between them is untouched.

- [ ] **Step 4: Verify build and rendered content**

Run: `npm run build && grep -c "Dillon Eckley" out/about/index.html && grep -c "What is VGDC?" out/about/index.html && grep -c "scale-150" out/about/index.html`
Expected: build succeeds; all three greps ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add content/officers.json content/about.json app/about/page.tsx
git commit -m "feat: move About page officers and prose to content JSON"
```

---

### Task 6: Migrate past jams to a folder of JSON files

**Files:**
- Create: `content/jams/2026-05-spring-2026.json`
- Create: `content/jams/2025-12-fall-2025.json`
- Create: `app/past-jams/JamsView.tsx` (client component with the Swiper UI)
- Modify: `app/past-jams/page.tsx` (becomes a server component that reads `content/jams/` at build time)

This task also de-duplicates the currently copy-pasted jam sections: one `JamSection` render path handles every jam, so adding a jam is purely a new JSON file.

- [ ] **Step 1: Create `content/jams/2026-05-spring-2026.json`**

```json
{
  "title": "Spring 2026 Game Jam",
  "date": "2026-05",
  "resultsUrl": "https://itch.io/jam/osu-game-jam-spring-2026/results",
  "entries": [
    { "title": "Wandor", "author": "drThunderbuckle", "image": "/images/s26gamejam/wandor.png", "link": "https://drthunderbuckle.itch.io/wandor", "place": 1 },
    { "title": "ByDayByKnight", "author": "BlastDevelopment", "image": "/images/s26gamejam/bydaybyknight.png", "link": "https://blastdevelopment.itch.io/bydaybyknight", "place": 2 },
    { "title": "Cold Brew", "author": "Snakatack, Helloimbo", "image": "/images/s26gamejam/coldbrew.png", "link": "https://snakatack.itch.io/cold-brew", "place": 3 },
    { "title": "Milo", "author": "Shadow05Striker", "image": "/images/s26gamejam/milo.png", "link": "https://shadow05striker.itch.io/milo" },
    { "title": "Reboot", "author": "WafflesTheHutt", "image": "/images/s26gamejam/reboot.png", "link": "https://wafflesthehutt.itch.io/reboot" },
    { "title": "DuoDash", "author": "JoshuaPrice13", "image": "/images/s26gamejam/duodash.png", "link": "https://joshuaprice13.itch.io/duodash" },
    { "title": "Above Myself", "author": "leporus", "image": "/images/s26gamejam/abovemyself.png", "link": "https://leporus.itch.io/above-myself" },
    { "title": "My Ghost and Me", "author": "Daarkswoord", "image": "https://i0.wp.com/seds.org/wp-content/uploads/2020/02/placeholder.png?fit=1200%2C800&ssl=1", "link": "https://daarkswoord.itch.io/double-life" }
  ]
}
```

- [ ] **Step 2: Create `content/jams/2025-12-fall-2025.json`**

```json
{
  "title": "Fall 2025 Game Jam",
  "date": "2025-12",
  "resultsUrl": "https://itch.io/jam/osu-vgdc-gamejam-2025/results",
  "entries": [
    { "title": "VGDC ORBITAL DEMO", "author": "WafflesTheHutt", "image": "/images/f25gamejam/orbitaldemo.png", "link": "https://wafflesthehutt.itch.io/vgdc-orbital-demo", "place": 1 },
    { "title": "No Return", "author": "Snakatack, Helloimbo", "image": "/images/f25gamejam/noreturn.png", "link": "https://snakatack.itch.io/no-return" },
    { "title": "Soundtrack", "author": "Leporus", "image": "/images/f25gamejam/soundtrack.png", "link": "https://leporus.itch.io/soundtrack" },
    { "title": "Shadow Switch Runner", "author": "Daarkswoord, Myanglioce, JoshuaPrice13", "image": "/images/f25gamejam/shadowrunner.png", "link": "https://daarkswoord.itch.io/shadow-switch-runner" }
  ]
}
```

- [ ] **Step 3: Create `app/past-jams/JamsView.tsx`**

This is the existing page's UI, generalized to render any list of jams (single source for the card markup instead of two copies):

```tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export interface GameSubmission {
  title: string;
  author: string;
  image: string;
  link: string;
  place?: number;
}

export interface Jam {
  title: string;
  date: string;
  resultsUrl?: string;
  entries: GameSubmission[];
}

const placeRing = (place?: number) =>
  place && place <= 3
    ? 'ring-4 ' +
      (place === 1 ? 'ring-yellow-500' : place === 2 ? 'ring-gray-400' : 'ring-amber-700')
    : '';

const placeBadgeBg = (place: number) =>
  place === 1 ? 'bg-yellow-500' : place === 2 ? 'bg-gray-400' : 'bg-amber-700';

const placeCardBg = (place?: number) =>
  place === 1
    ? 'bg-gradient-to-br from-yellow-600/20 to-gray-700'
    : place === 2
    ? 'bg-gradient-to-br from-gray-500/20 to-gray-700'
    : place === 3
    ? 'bg-gradient-to-br from-amber-700/20 to-gray-700'
    : 'bg-gray-700';

function JamSection({ jam }: { jam: Jam }) {
  return (
    <div className="bg-gray-800 rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{jam.title}</h2>
        <p className="text-gray-400">{jam.entries.length} submissions</p>
      </div>

      {jam.entries.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation, FreeMode, Pagination]}
            navigation
            freeMode
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="!pb-12 !px-6 !py-4 !-mx-6 !-my-4"
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-navigation-size': '20px',
              '--swiper-pagination-color': '#FFD700',
            } as React.CSSProperties}
          >
            {jam.entries.map((game, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block group cursor-pointer ${placeRing(game.place)} rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl relative`}
                >
                  {game.place && game.place <= 3 && (
                    <div className={`absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${placeBadgeBg(game.place)}`}>
                      {game.place}
                    </div>
                  )}
                  <div className="aspect-square bg-gray-700 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className={`p-4 ${placeCardBg(game.place)}`}>
                    <h3 className="font-bold text-lg mb-1 truncate">{game.title}</h3>
                    <p className="text-sm text-gray-400">by {game.author}</p>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {jam.resultsUrl && (
            <div className="flex justify-center mt-8">
              <a
                href={jam.resultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/itchiocolor.svg"
                  alt="View results on itch.io"
                  className="h-12"
                />
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Game jam results will be posted here after the event!</p>
        </div>
      )}
    </div>
  );
}

export default function JamsView({ jams }: { jams: Jam[] }) {
  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="flex items-center gap-4 mb-2">
          <svg className="w-10 h-10 animate-spin-reverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
          <h1 className="text-4xl font-bold">VGDC Rewind</h1>
        </div>
        <p className="text-gray-400 text-sm ml-14 mb-8">Here you can find our past game jam submissions and results from our members.</p>

        <div className="space-y-12">
          {jams.map((jam) => (
            <JamSection key={jam.title} jam={jam} />
          ))}
        </div>
      </div>
    </main>
  );
}
```

Note: two tiny cosmetic bugs in the old copy-pasted markup (the Fall 2025 copy mapped 2nd place to the bronze ring/background instead of silver) are fixed by unifying — the generalized helpers use the Spring 2026 (correct) mapping for all jams.

- [ ] **Step 4: Replace `app/past-jams/page.tsx` with a server component that loads the JSON folder**

Replace the entire file with:

```tsx
import fs from 'node:fs';
import path from 'node:path';
import JamsView, { Jam } from './JamsView';

function loadJams(): Jam[] {
  const jamsDir = path.join(process.cwd(), 'content', 'jams');
  return fs
    .readdirSync(jamsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(jamsDir, f), 'utf8')) as Jam)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export default function PastJams() {
  return <JamsView jams={loadJams()} />;
}
```

No `'use client'` directive — this runs at build time (static export), so `fs` is fine. New jam files appear automatically, newest first via the `date` field.

- [ ] **Step 5: Verify build and rendered content**

Run: `npm run build && grep -c "Spring 2026 Game Jam" out/past-jams/index.html && grep -c "Fall 2025 Game Jam" out/past-jams/index.html && grep -c "Wandor" out/past-jams/index.html`
Expected: build succeeds; all greps ≥ 1. Also verify order: `grep -o "Spring 2026 Game Jam\|Fall 2025 Game Jam" out/past-jams/index.html | head -2` — first line must be `Spring 2026 Game Jam`.

- [ ] **Step 6: Commit**

```bash
git add content/jams app/past-jams/JamsView.tsx app/past-jams/page.tsx
git commit -m "feat: move game jams to content/jams/ folder, one file per jam"
```

---

### Task 7: Sveltia CMS admin UI

**Files:**
- Create: `public/admin/index.html`
- Create: `public/admin/config.yml`

- [ ] **Step 1: Create `public/admin/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>VGDC Content Manager</title>
  </head>
  <body>
    <!-- Pinned version. Emergency fallback: replace this script tag with
         https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js (same config.yml works). -->
    <script src="https://unpkg.com/@sveltia/cms@0.113.5/dist/sveltia-cms.js" type="module"></script>
  </body>
</html>
```

(If a newer stable Sveltia version exists at implementation time, pin that instead — but always pin an exact version, never a range.)

- [ ] **Step 2: Create `public/admin/config.yml`**

```yaml
backend:
  name: github
  repo: charlieautry/vgdc-site
  branch: main
  # base_url is filled in by Task 9 (OAuth worker). Until then, use
  # "Sign in with Token" on the /admin login screen (PAT fallback).

media_folder: public/images
public_folder: /images

collections:
  - name: settings
    label: Site Settings
    files:
      - name: settings
        label: Banner & Links
        file: content/settings.json
        fields:
          - { name: bannerText, label: Scrolling Banner Text, widget: string }
          - { name: bannerUrl, label: Banner Link URL, widget: string }
          - { name: bannerEnabled, label: Show Banner, widget: boolean, default: true }
          - { name: gameJamUrl, label: Game Jam Link (navbar), widget: string, hint: "Where the Game Jam logo in the navigation bar links to." }

  - name: events
    label: Events
    files:
      - name: events
        label: Upcoming Events
        file: content/events.json
        fields:
          - name: items
            label: Events
            label_singular: Event
            widget: list
            summary: "{{fields.title}} — {{fields.date}}"
            fields:
              - { name: type, label: Type, widget: string, hint: "Short tag shown on the card, e.g. Meeting, Workshop, Game Jam" }
              - { name: title, label: Title, widget: string }
              - { name: desc, label: Description, widget: text }
              - { name: date, label: Date, widget: string, hint: "Format YYYY-MM-DD, e.g. 2026-09-03", pattern: ['^$|^\d{4}-\d{2}-\d{2}$', 'Must be YYYY-MM-DD (or empty)'] }
              - { name: time, label: Start Time, widget: string, hint: "e.g. 4:30 PM", required: false, default: "" }
              - { name: endDate, label: End Date, widget: string, required: false, hint: "Only for multi-day events. Format YYYY-MM-DD", pattern: ['^$|^\d{4}-\d{2}-\d{2}$', 'Must be YYYY-MM-DD (or empty)'] }
              - { name: endTime, label: End Time, widget: string, required: false, hint: "e.g. 6:30 PM", default: "" }
              - { name: location, label: Location, widget: string, required: false }
              - { name: image, label: Image, widget: image, required: false }

  - name: importantEvents
    label: Important Events (home carousel)
    files:
      - name: importantEvents
        label: Important Events
        file: content/important-events.json
        fields:
          - name: items
            label: Important Events
            label_singular: Important Event
            widget: list
            summary: "{{fields.title}}"
            fields:
              - { name: title, label: Title, widget: string }
              - { name: image, label: Image, widget: image, required: false, default: "" }
              - { name: description, label: Description, widget: text }
              - { name: date, label: Date Label, widget: string, hint: "Free text shown above the title, e.g. Summer 2026" }
              - { name: link, label: Link URL, widget: string, required: false, default: "" }
              - { name: linkText, label: Link Text, widget: string, required: false, default: "" }

  - name: resources
    label: Resources
    files:
      - name: resources
        label: Resources
        file: content/resources.json
        fields:
          - name: items
            label: Resources
            label_singular: Resource
            widget: list
            summary: "{{fields.title}}"
            fields:
              - { name: title, label: Title, widget: string }
              - { name: description, label: Description, widget: text }
              - name: type
                label: Type
                widget: select
                options: [link, youtube, download]
                default: link
              - { name: url, label: "URL (or YouTube video ID)", widget: string, hint: "For type 'youtube', paste only the video ID, e.g. LOhfqjmasi0" }
              - { name: category, label: Category, widget: string, hint: "Existing categories: Documentation, Tutorial, Tool, Community, Marketing" }
              - { name: tags, label: Tags, widget: list, hint: "Comma-separated keywords used by search" }

  - name: faq
    label: Footer FAQ
    files:
      - name: faq
        label: FAQ
        file: content/faq.json
        fields:
          - name: items
            label: Questions
            label_singular: Question
            widget: list
            summary: "{{fields.question}}"
            fields:
              - { name: question, label: Question, widget: string }
              - { name: answer, label: Answer, widget: text }

  - name: about
    label: About Page
    files:
      - name: about
        label: About Sections
        file: content/about.json
        fields:
          - { name: officersHeading, label: Officers Section Heading, widget: string }
          - name: sections
            label: Text Sections
            label_singular: Section
            widget: list
            summary: "{{fields.heading}}"
            fields:
              - { name: heading, label: Heading, widget: string }
              - { name: body, label: Body, widget: text, hint: "Leave a blank line between paragraphs." }
              - { name: image, label: Image, widget: image, required: false, default: "" }
      - name: officers
        label: Officers
        file: content/officers.json
        fields:
          - name: items
            label: Officers
            label_singular: Officer
            widget: list
            summary: "{{fields.name}} — {{fields.role}}"
            fields:
              - { name: name, label: Name, widget: string }
              - { name: role, label: Role, widget: string }
              - { name: major, label: Major, widget: string }
              - { name: year, label: Year, widget: string, hint: "e.g. Sophomore" }
              - { name: image, label: Headshot, widget: image }
              - { name: imageClass, label: "Photo adjustment (advanced)", widget: string, required: false, default: "", hint: "Leave empty. CSS classes for zoom/crop, e.g. scale-150" }

  - name: jams
    label: Game Jams
    label_singular: Game Jam
    folder: content/jams
    extension: json
    format: json
    create: true
    identifier_field: title
    slug: "{{fields.date}}-{{slug}}"
    summary: "{{fields.title}}"
    fields:
      - { name: title, label: Jam Title, widget: string, hint: "e.g. Fall 2026 Game Jam" }
      - { name: date, label: Sort Date, widget: string, hint: "YYYY-MM, newest shows first, e.g. 2026-12", pattern: ['^\d{4}-\d{2}$', 'Must be YYYY-MM'] }
      - { name: resultsUrl, label: "itch.io Results URL", widget: string, required: false, default: "" }
      - name: entries
        label: Submissions
        label_singular: Submission
        widget: list
        summary: "{{fields.title}} by {{fields.author}}"
        fields:
          - { name: title, label: Game Title, widget: string }
          - { name: author, label: Author(s), widget: string }
          - { name: image, label: Cover Image, widget: image }
          - { name: link, label: "itch.io Link", widget: string }
          - { name: place, label: "Place (1-3, winners only)", widget: number, required: false, value_type: int, min: 1, max: 3 }
```

- [ ] **Step 3: Verify the admin page ships in the build and config parses**

Run: `npm run build && ls out/admin/index.html out/admin/config.yml`
Expected: build succeeds and both files are listed under `out/admin/` (Next copies `public/` into the export).

- [ ] **Step 4: Local smoke test of the CMS UI**

Run: `npm run dev` (background), then open `http://localhost:3000/admin/index.html` in a browser. Expected: the Sveltia login screen renders (config parse errors would show on screen instead). Sveltia's "Work with Local Repository" option can be used to open the local repo folder and verify every collection lists its content correctly. Stop the dev server afterward. If running headless/agentically, skip the browser check — the Task 11 end-to-end pass covers it.

- [ ] **Step 5: Commit**

```bash
git add public/admin/index.html public/admin/config.yml
git commit -m "feat: add Sveltia CMS admin at /admin"
```

---

### Task 8: GitHub Actions auto-deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npm run build

      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
```

- [ ] **Step 2: Configure the two repo secrets (manual, needs the user's Cloudflare account)**

In the Cloudflare dashboard: create an API token using the **"Edit Cloudflare Workers"** template (My Profile → API Tokens → Create Token). Note: choose no expiration so it doesn't die while the maintainer is away. Copy the Account ID from the dashboard sidebar (Workers & Pages overview).

In GitHub: repo → Settings → Secrets and variables → Actions → add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

If executing agentically: `gh secret set CLOUDFLARE_API_TOKEN` and `gh secret set CLOUDFLARE_ACCOUNT_ID` after asking the user for the values — the token itself must come from the user.

- [ ] **Step 3: Commit, push, and verify the workflow deploys**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy to Cloudflare on push to main"
git push
gh run watch --exit-status
```

Expected: the run completes green and the deploy step reports a successful `wrangler deploy`. Then verify the live site still serves (open the production URL). If the run fails on secrets, finish Step 2 first and re-run with `gh run rerun --failed`.

---

### Task 9: GitHub OAuth sign-in (sveltia-cms-auth worker)

**Files:**
- Modify: `public/admin/config.yml` (fill in `base_url`)

This task is mostly console work; the user must be present for the GitHub OAuth App creation (or provide credentials). PAT sign-in already works without this task — do not block later tasks on it.

- [ ] **Step 1: Deploy the auth worker**

Follow https://github.com/sveltia/sveltia-cms-auth — either the one-click "Deploy to Cloudflare Workers" button, or:

```bash
git clone https://github.com/sveltia/sveltia-cms-auth
cd sveltia-cms-auth
npx wrangler deploy
```

Note the deployed worker URL, e.g. `https://sveltia-cms-auth.<subdomain>.workers.dev`.

- [ ] **Step 2: Register the GitHub OAuth App**

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
- Application name: `VGDC Site CMS`
- Homepage URL: the production site URL
- Authorization callback URL: `https://<worker-url>/callback`

Copy the Client ID; generate and copy a Client Secret.

- [ ] **Step 3: Set the worker's environment variables**

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

(Run inside the sveltia-cms-auth checkout; paste the values when prompted. Optionally set `ALLOWED_DOMAINS` to the production site domain to stop other sites using this worker.)

- [ ] **Step 4: Point the CMS at the worker**

In `public/admin/config.yml`, replace the `# base_url is filled in by Task 9` comment lines with:

```yaml
  base_url: https://<worker-url>
```

(Keep it indented under `backend:` alongside `repo:` and `branch:`.)

- [ ] **Step 5: Commit and push**

```bash
git add public/admin/config.yml
git commit -m "feat: enable GitHub OAuth sign-in for /admin"
git push
```

- [ ] **Step 6: Verify sign-in end to end**

After the deploy workflow finishes, open `https://<production-site>/admin`, click "Sign in with GitHub", authorize, and confirm the collections dashboard loads. Expected: the Events, Resources, Game Jams, About, FAQ, and Site Settings collections all appear with current content.

---

### Task 10: Officer handoff doc

**Files:**
- Create: `EDITING.md`

- [ ] **Step 1: Create `EDITING.md`**

```markdown
# Editing the VGDC Website (no code needed)

The site is edited at **https://<production-site>/admin** — a form-based editor.
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
```

Replace `<production-site>` with the real production URL (check `wrangler.jsonc` / the Cloudflare dashboard for the workers.dev or custom domain).

- [ ] **Step 2: Commit and push**

```bash
git add EDITING.md
git commit -m "docs: add officer editing guide"
git push
```

---

### Task 11: End-to-end verification

No new files — this task proves the whole pipeline against the spec's success criteria.

- [ ] **Step 1: Full local build check**

Run: `npm run build`
Expected: success, no type errors, gallery regenerates.

- [ ] **Step 2: Visual parity spot-check**

Serve the export locally: `npx serve out` (or `python -m http.server -d out`) and compare home, about, resources, and past-jams pages against the live production site. Expected: identical content and styling (the only allowed difference: the two Fall 2025 second-place color fixes from Task 6).

- [ ] **Step 3: CMS edit round-trip (with the user or an officer)**

At `https://<production-site>/admin`: edit an Important Event's description, save, wait for the Actions run to finish, and confirm the change is live. Then revert the edit the same way.

- [ ] **Step 4: PAT fallback check**

Sign out, sign in once via "Sign in with Token" with a PAT, confirm the dashboard loads, sign out.

- [ ] **Step 5: Image round-trip**

Upload a test image via the CMS Assets view into `images/gallery`, confirm it appears in the About page gallery after the build, then delete it via the CMS and confirm it disappears.

- [ ] **Step 6: Report**

Summarize results against the spec's five success criteria. The fifth (an officer completes an edit using only EDITING.md) happens when the user hands off — note it as pending user action.
