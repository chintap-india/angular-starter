# Chintap Website Content Directory

This directory contains the canonical text content for all pages and legal policies of [chintap.com](https://chintap.com), maintained directly in Markdown format within the repository.

---

## Content Index

| Page / Document | Route | Canonical Source | Angular Component / Feature |
|:---|:---|:---|:---|
| **Home** | `/` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`HomePageComponent`](../src/app/pages/home/home-page.component.ts) |
| **Features & Stack** | `/features` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`FeaturesPageComponent`](../src/app/pages/features/features-page.component.ts) |
| **5 Discovery Pillars** | `/best-practices` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`BestPracticesPageComponent`](../src/app/pages/best-practices/best-practices-page.component.ts) |
| **Project Tasks (CRUD)** | `/tasks` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`TasksPageComponent`](../src/app/pages/tasks/tasks-page.component.ts) |
| **About Chintap** | `/about` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`AboutPageComponent`](../src/app/pages/about/about-page.component.ts) |
| **Contact Us** | `/contact` | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`ContactPageComponent`](../src/app/pages/contact/contact-page.component.ts) |
| **Privacy Policy** | Modal / Footer | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`LegalDialogComponent`](../src/app/features/modals/legal-dialog/legal-dialog.component.ts) |
| **Terms of Use** | Modal / Footer | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`LegalDialogComponent`](../src/app/features/modals/legal-dialog/legal-dialog.component.ts) |

---

## Managing Partners & Collaborators (`partners.json`)

Partner directory entries on `/partners` are driven by `content/partners.json`. Each entry supports:
- `id`: Unique kebab-case slug (e.g. `zoho`, `netlify`).
- `name`: Partner / organization name.
- `category`: Category name used for chip filtering (e.g. `Platform`, `Technology`, `Media`, `Design`).
- `description`: 1-2 sentence description of the collaboration.
- `logoUrl`: Path to SVG or PNG logo in `public/images/partners/` (or leave empty `""` to display an automatic stylish monogram emblem).
- `websiteUrl`: External URL (e.g. `https://example.com`) or internal route (e.g. `/contact`).

---

## Brand Essence & Tone of Voice

- **Brand Name**: Chintap (`chin` in default text color, `tap` in brand red `#ea1c24`)
- **Tagline**: *Things. Apps. Possibilities.*
- **Tone**: Curious, thoughtful, unhurried, practical, understated.
- **Philosophy**: We explore ideas across physical products and digital software, focusing on what makes sense to make rather than adding complexity for its own sake.
- **Inquiries**: Contact form (`/contact`)

---

## Synchronization with Codebase

When editing text in this directory:
1. Update the corresponding Markdown file in `content/`.
2. Update the structured content object in [`src/app/core/services/content.service.ts`](../src/app/core/services/content.service.ts).
3. If public export is modified, sync [`public/contents.md`](../public/contents.md).
4. Run `npm test` and `npm run build` to verify tests and prerendered SSG routes.
