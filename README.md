# The Wolf Project

The Wolf Project site is a Next.js + Firebase marketing and content platform for an access-to-care initiative under SGT Canines. The site explains the mission, publishes stories and case updates, tracks fundraising progress, and includes a custom admin panel for non-technical content editing.

## What The Site Does

The public site currently covers these jobs:

- Explains the mission behind The Wolf Project and Wolf's founding story.
- Publishes informational pages about access to care, trust, transparency, and how the lifeline works.
- Displays case pages with fundraising goals, progress, and status updates.
- Displays blog posts and an RSS feed at `/feed.xml`.
- Collects email signups through the `/api/subscribe` endpoint.
- Promotes merchandise and donation pathways.
- Provides a custom admin panel at `/admin` for content management.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Firebase Auth + Firestore for content persistence
- Cloudinary for image uploads
- Markdoc for long-form case and blog content

## Content Model

All content is stored in Firestore with the following collections:

### Collections

- `cases/{slug}` — Dog cases with fundraising goals, status, updates, and stories
- `posts/{slug}` — Blog posts with Markdoc body content

### Singletons (`singletons/{key}`)

- `donationProgress` — Fundraising goal and amount raised
- `applicationConfig` — Application open/closed state and messaging
- `siteSettings` — Phase label, operational state, fund allocation
- `homeContent` — Homepage hero, mission, CTA copy
- `storyContent` — Our Story page sections and statistics
- `processContent` — How It Works page steps and conditions
- `trustContent` — Trust, impact, and transparency copy
- `donationContent` — Donate and Join the Pack page messaging
- `shopContent` — Shop page and product storytelling copy

The runtime adapter in `lib/site-content.ts` reads Firestore first and falls back to `data/site-content.ts` defaults if a singleton entry is missing.

### Still code-managed

- Navigation and footer links
- Social links
- Some merch/product metadata and outbound product URLs
- Support option cards
- Asset registry data in `data/assets.ts`

## Admin Panel

The admin panel at `/admin` provides a full content management interface:

- **Dashboard** — Overview of cases, posts, and singletons with a "Reset Demo Data" button
- **Cases** — List, create, edit, and delete dog cases
- **Blog Posts** — List, create, edit, and delete blog posts
- **Site Settings** — Edit all 9 singletons through structured forms

Authentication uses Firebase Auth (email/password). All mutations are protected by token verification.

## Demo Banner

A dismissible demo banner appears at the top of the site linking to the admin panel. It can be dismissed via the close button and uses localStorage to remember the dismissal.

## Seed Data

The seed system at `POST /api/seed` (auth-protected) resets all Firestore content to demo data. This can also be triggered from the admin dashboard's "Reset Demo Data" button.

Seeded cases: Wolf (completed), Luna (active), Juniper (in-treatment), Scout (funded), Remy (memorial).

Seeded posts: 5 editorial posts covering emergency care, case updates, and community stories.

Seeded singletons: donationProgress, applicationConfig, siteSettings.

## Local Setup

1. Install dependencies.

```bash
pnpm install
```

2. Create a local env file.

```bash
cp .env.example .env.local
```

3. Start the app.

```bash
pnpm dev
```

4. Open the site at `http://localhost:3000`.

5. Open the admin panel at `http://localhost:3000/admin`.

## Environment Variables

The checked-in template is `.env.example`.

### Firebase (required)

- `NEXT_PUBLIC_FIREBASE_API_KEY` — Firebase client API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` — Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` — Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` — Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` — Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` — Firebase app ID
- `FIREBASE_PROJECT_ID` — Firebase project ID (server)
- `FIREBASE_CLIENT_EMAIL` — Service account email
- `FIREBASE_PRIVATE_KEY` — Service account private key

### Cloudinary (required for image uploads)

- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

### Site

- `NEXT_PUBLIC_SITE_URL` — Used for metadata and RSS feed URLs
- `KIT_API_KEY` — Optional. Enables newsletter signup proxy to Kit
- `KIT_FORM_ID` — Optional. The Kit form that receives subscriptions

If the Kit variables are omitted, the subscribe endpoint returns success and logs the submitted email server-side.

## Editing Workflow

1. Sign in at `/admin/login` with your Firebase Auth credentials.
2. Create, edit, or delete cases and blog posts from the admin panel.
3. Edit site settings, donation progress, and other singletons from the Settings tab.
4. Upload images via Cloudinary integration.
5. Changes are persisted immediately to Firestore and reflected on the public site.

## Repo Map

- `app/` — Route files, API endpoints, and admin panel
- `app/admin/` — Admin panel pages (login, dashboard, CRUD editors, settings)
- `app/api/` — API routes for cases, posts, singletons, upload, seed, subscribe
- `components/` — Reusable UI components
- `components/admin/` — Admin-specific components (form-field, save-button, etc.)
- `content/` — Legacy content files (kept for reference, not used at runtime)
- `data/` — Code-managed defaults and assets
- `lib/db/` — Firebase/Firestore data access layer
- `lib/auth/` — Auth context and token verification
- `lib/site-content.ts` — Server-side content adapter
- `lib/site-url.ts` — Canonical site URL helper
- `public/assets/` — Local media
- `types/` — Shared TypeScript types

## Production Requirements

Before shipping to production, verify all of the following:

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical production domain.
2. Decide whether email signup should be live.
3. If email signup should be live, set `KIT_API_KEY` and `KIT_FORM_ID`.
4. Confirm the public domain used for metadata, RSS, and social sharing is correct.
5. Review every seeded dummy case, post, and singleton entry and replace or remove anything not meant for public launch.
6. Confirm remote merch images from `yourdogcanstay.com` still resolve and are permitted by `next.config.ts`.
7. Confirm redirects still reflect the intended information architecture:
	 `/join-the-pack -> /donate`
	 `/impact -> /transparency`
8. Smoke test these routes before release:
	 `/`
	 `/our-story`
	 `/how-it-works`
	 `/our-promise`
	 `/transparency`
	 `/cases`
	 `/blog`
	 `/donate`
	 `/shop`
	 `/apply`
	 `/feed.xml`
	 `/admin`
9. Verify all required static assets are present in `public/assets` and that externally hosted images are still available.

## Known Limitations And TODOs

- Donation progress `source: api` is not implemented yet. The schema exposes the setting, but the frontend still uses a placeholder/manual workflow.
- `components/donation-progress-bar.tsx` still has the API fetch TODO for live donation sync.
- Some site data is still intentionally code-managed rather than editable in the GUI.
- The current demo content is operationally useful for testing, but it should be reviewed carefully before a public launch.

## Recommended Release Process

1. Edit content in the admin panel at `/admin`.
2. Review changes on a local branch or staging deployment.
3. Run lint and a production build.
4. Have a human review copy, links, donation destinations, and legal/tax language.
5. Merge and deploy.

## Commands

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```
