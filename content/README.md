# Chintap Website Content Directory

This directory contains the canonical text content for all pages and legal policies of [chintap.com](https://chintap.com), maintained directly in Markdown format within the repository.

---

## Content Index

| Page / Document | Route | Markdown File | Canonical Source | Angular Component / Feature |
|:---|:---|:---|:---|:---|
| **Home** | `/` | [`home.md`](home.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`HomePageComponent`](../src/app/pages/home/home-page.component.ts) |
| **Features & Stack** | `/features` | [`features.md`](features.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`FeaturesPageComponent`](../src/app/pages/features/features-page.component.ts) |
| **5 Discovery Pillars** | `/best-practices` | [`best-practices.md`](best-practices.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`BestPracticesPageComponent`](../src/app/pages/best-practices/best-practices-page.component.ts) |
| **Project Tasks (CRUD)** | `/tasks` | [`tasks.md`](tasks.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`TasksPageComponent`](../src/app/pages/tasks/tasks-page.component.ts) |
| **About Chintap** | `/about` | [`about.md`](about.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`AboutPageComponent`](../src/app/pages/about/about-page.component.ts) |
| **Contact Us** | `/contact` | [`contact.md`](contact.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`ContactPageComponent`](../src/app/pages/contact/contact-page.component.ts) |
| **Privacy Policy** | Modal / Footer | [`privacy-policy.md`](privacy-policy.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`LegalDialogComponent`](../src/app/features/modals/legal-dialog/legal-dialog.component.ts) |
| **Terms of Use** | Modal / Footer | [`terms-of-use.md`](terms-of-use.md) | [`site.content.ts`](../src/app/core/config/site.content.ts) | [`LegalDialogComponent`](../src/app/features/modals/legal-dialog/legal-dialog.component.ts) |

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
