# 🎨 Rebranding & Customization Guide

> **Transform Chintap Angular Starter into your own custom product or marketing website in minutes without touching HTML templates.**

This starter kit is engineered with a **zero-hardcoding architecture**. All branding, navigation, page copy, FAQs, metadata, and asset references are decoupled into two configuration files and a static asset directory.

```
┌────────────────────────────────────────────────────────┐
│                   YOUR CUSTOM WEBSITE                  │
├──────────────────────────┬─────────────────────────────┤
│ 1. Metadata & Domain     │ src/app/core/config/        │
│    Brand identity, SEO,  │ └── site.config.ts          │
│    Organization, Social  │                             │
├──────────────────────────┼─────────────────────────────┤
│ 2. Page Content & Copy   │ src/app/core/config/        │
│    Hero, FAQs, Features, │ └── site.content.ts         │
│    Nav, Footer, Disclaim │                             │
├──────────────────────────┼─────────────────────────────┤
│ 3. Brand Artwork         │ public/images/              │
│    Drop-in SVG logos &   │ ├── logo-light.svg          │
│    OpenGraph image       │ ├── logo-dark.svg           │
│                          │ └── og-preview.jpg          │
└──────────────────────────┴─────────────────────────────┘
```

---

## ⚡ The 3-Step Quick Rebrand

### Step 1: Configure Brand & Metadata (`site.config.ts`)

Open `src/app/core/config/site.config.ts` and customize your site identity:

```typescript
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: 'Acme Cloud Platform',
  shortName: 'Acme',
  tagline: 'Enterprise Cloud Infrastructure for Next-Gen Teams',
  description: 'Deploy, scale, and optimize cloud workloads with real-time AI observability.',
  baseUrl: 'https://acme.com',
  defaultOgImage: 'https://acme.com/images/og-preview.jpg',
  locale: 'en_US',
  themeColor: '#0f172a',

  // Brand Artwork Assets
  brand: {
    logoLight: '/images/logo-light.svg',
    logoDark: '/images/logo-dark.svg',
    logoAlt: 'Acme Cloud Platform Logo',
    favicon: '/favicon.ico',
    ogImage: '/images/og-preview.jpg',
  },

  // Author & Credentials (used for GEO & AI citation algorithms)
  author: {
    name: 'Jane Doe',
    url: 'https://github.com/janedoe',
    email: 'jane@acme.com',
  },

  // Organization Entity (powers Schema.org Organization knowledge graph)
  organization: {
    name: 'Acme Technologies Inc.',
    legalName: 'Acme Technologies Incorporated',
    url: 'https://acme.com',
    logo: 'https://acme.com/images/logo-light.svg',
    email: 'contact@acme.com',
    address: {
      streetAddress: '100 Market Street, Suite 400',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    geo: {
      latitude: 37.7937,
      longitude: -122.3965,
    },
  },

  // Social Channels
  social: {
    github: 'https://github.com/acme/platform',
    twitter: 'https://x.com/acme',
    linkedin: 'https://linkedin.com/company/acme',
  },

  // Feature Toggles
  features: {
    seo: true,        // OpenGraph, Twitter Cards, Canonical links
    aeo: true,        // Schema.org FAQPage & Knowledge Graph JSON-LD
    llmo: true,       // /llms.txt, /llms-full.txt, /.well-known/ard.json
    geo: true,        // Geographical coordinates & Organization schema
    ssr: true,        // Static Site Generation pre-rendering
    darkTheme: true,  // Light/Dark mode toggle with system preference sync
  },
};
```

---

### Step 2: Drop In Your Brand Assets (`public/images/`)

Replace these three files with your company's artwork. No code changes required!

| File Path | Description | Recommended Specs |
|---|---|---|
| `public/images/logo-light.svg` | Logo for light theme navigation | Vector SVG, 1:1 square or horizontal mark |
| `public/images/logo-dark.svg` | Logo for dark theme navigation | Vector SVG, high-contrast on dark `#0c0a09` |
| `public/images/og-preview.jpg` | Social share card (X/Twitter, LinkedIn, Slack) | 1200 x 630 pixels, JPEG/PNG (< 300KB) |
| `public/favicon.ico` | Browser tab icon | 32x32 or 48x48 icon file |

> [!TIP]
> **Zero-Distortion Guarantee**: The header and footer logo components use `aspect-square`, `object-contain`, and `max-h-full` styling. Even if your SVG has a wide aspect ratio, it will automatically center without vertical or horizontal squishing or stretching.

---

### Step 3: Edit Your Content (`site.content.ts`)

Open `src/app/core/config/site.content.ts` to customize headlines, descriptions, CTAs, and FAQs across all pages.

#### 1. Header Brand Display
```typescript
brand: {
  brandPrefix: 'Acme',    // First part of the brand name in header
  brandSuffix: 'Cloud',   // Second part (highlighted with emerald accent)
  tagline: 'Enterprise Infrastructure',
},
```

#### 2. Navigation Menu
Modify or re-order the top navbar and footer links:
```typescript
navigation: {
  links: [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Best Practices', path: '/best-practices' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
},
```

#### 3. Home Page Hero & FAQs
```typescript
home: {
  hero: {
    badge: '🚀 ACME 2.0 IS LIVE',
    titleLine1: 'Next-Generation',
    titleHighlight: 'Cloud Infrastructure',
    description: 'Deploy global serverless edge functions with sub-5ms cold starts.',
    primaryCtaText: 'Start Free Trial',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'View Features',
    secondaryCtaLink: '/features',
  },
  // FAQs automatically feed into the Schema.org FAQPage JSON-LD schema
  // which powers Google AI Overviews and Perplexity search answers!
  faqs: [
    {
      question: 'How fast can I deploy?',
      answer: 'Deploys happen in under 30 seconds via Git integration.',
      category: 'General',
    },
  ],
},
```

#### 4. Features & Tech Stack Page
Customize your value propositions and tech stack highlights:
```typescript
features: {
  title: 'Built with Enterprise Standards',
  subtitle: 'Reliable, secure, and ready for high-throughput workloads.',
  techCards: [
    {
      name: 'Angular 22',
      category: 'Frontend Framework',
      description: 'Signals-first architecture with zoneless change detection.',
      badge: 'v22.0',
      logoType: 'angular',
      docUrl: 'https://angular.dev',
    },
    // Add or remove stack cards as needed...
  ],
  disclaimer: {
    title: 'Brand & Trademark Notice',
    text: 'All product names, logos, and brands are property of their respective owners...',
  },
},
```

#### 5. Footer Copyright & Legal Disclaimers
```typescript
footer: {
  copyright: '© 2026 Acme Technologies Inc. All rights reserved.',
  disclaimer: 'All product names, logos, and brands are property of their respective owners. Mention does not imply endorsement.',
  links: [ ... ],
},
```

---

## 📋 Built-In Tasks & Project Checklist Module

The starter includes an end-to-end task management module accessible at `/tasks`:

### Key Features
1. **Typed Reactive Forms**: Built using Angular 22 `FormGroup<{ title: FormControl<string>, ... }>` with strict validation and custom error hints.
2. **Dual-Mode Markdown Editor & Preview**: Write task descriptions using GitHub-flavored Markdown (`**bold**`, `*italic*`, `` `code` ``, ` ```typescript `, `- [ ] checklists`, `> quotes`) and switch between Write and Live Preview tabs.
3. **SSR-Safe Persistence**: Automatically syncs with `localStorage` in browser environments, while hydrating safely on the server without `window` or `document` crashes.
4. **Mock API Architecture**: `MockTaskApiService` simulates asynchronous HTTP delays (`Observable` + `delay`) and can be seamlessly swapped for a real REST, GraphQL, or Supabase backend.
5. **Netlify Auth / Identity Ready**: Includes `AuthService` with Netlify Identity hooks and a local Developer / Guest role toggle.

### How to Hook Up a Real API Backend
To replace the mock storage with your real backend, modify `src/app/core/services/mock-task-api.service.ts`:
```typescript
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.yourdomain.com/v1/tasks';

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  createTask(dto: CreateTaskDto): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, dto);
  }
}
```

---

## 🤖 AI Search & Machine-Readable Endpoints

When you rebrand the site, also update the static AI documentation in `public/`:

1. **`public/llms.txt`**:
   - Update the H1 `# Acme Cloud Platform` and summary description.
   - Update the links to point to your live domain.
2. **`public/llms-full.txt`**:
   - Provide a comprehensive architectural overview for RAG systems and LLM indexing.
3. **`public/.well-known/ard.json`**:
   - Update the `name`, `description`, and `endpoints` to match your service capabilities.
4. **`public/robots.txt`**:
   - Ensure the `Sitemap:` directive points to your live `baseUrl/sitemap.xml`.

---

## 🧪 Verification & Pre-Deployment Checklist

Before deploying your customized site to production, run the automated verification suite:

```bash
# 1. Run full unit test suite (100% green guarantee)
npm test

# 2. Compile and statically pre-render all routes
npm run build
```

### Inspect Pre-Rendered Routes
Check `dist/chintap-angular-starter/browser/` to ensure all routes generated static `index.html` files:
- `/` (`index.html`)
- `/features/index.html`
- `/best-practices/index.html`
- `/about/index.html`
- `/contact/index.html`
- `/tasks/index.html`
- `404.html`

### Validate Structured Data (JSON-LD)
1. Deploy to a preview URL or run `npx serve dist/chintap-angular-starter/browser`.
2. Test your URL in the [Google Rich Results Test](https://search.google.com/test/rich-results).
3. Confirm that **FAQPage** and **Organization / SoftwareApplication** schemas pass with 0 errors.

---

## 💸 100% Free-Tier Architecture (Zero Subscriptions, Zero Surprise Costs)

This starter kit is engineered to run **entirely on permanent free tiers** with zero credit card requirements and zero paid subscriptions:

| Capability | Free Tier Limit | Starter Kit Strategy |
|---|---|---|
| **Hosting & CDN** | 100 GB/month bandwidth | All pages pre-rendered statically (SSG). Zero server runtime cost. |
| **Build & Deploy** | 300 build minutes/month | Optimized esbuild pipeline completes builds in under 60 seconds (~5 build minutes/month for typical workflows). |
| **Authentication** | 1,000 active users/month | **Default**: 100% local, offline-first session state via `localStorage`. **Optional**: If you enable Netlify Identity, it runs inside Netlify's free 1,000 active users tier with zero paid plans. |
| **Contact Forms** | 100 submissions/month | Netlify Forms handles up to 100 free submissions/month. Includes automatic client-side fallback so visitors never experience blocked submissions. |
| **Custom Domains & SSL** | Unlimited free domains | Automated Let's Encrypt SSL certificates are provided free by Netlify with zero renewal fees. |
| **Dependencies** | MIT / Open-Source | Zero paid SaaS SDKs, zero API keys required, and zero tracking scripts. |

> [!IMPORTANT]
> **No Paid Add-Ons**: Do NOT enable Netlify Analytics ($9/mo) or Netlify Large Media unless explicitly needed. The template includes zero paid add-ons and is 100% operational on Netlify's Free Starter Plan.

---

## 🚀 One-Click Deployment

### Netlify (Recommended)
1. Push your repository to GitHub.
2. Log into [Netlify](https://app.netlify.com) and click **"Add new site" → "Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/chintap-angular-starter/browser`
5. Click **Deploy Site**!

### Vercel, Cloudflare Pages, AWS S3
Simply set the output directory to `dist/chintap-angular-starter/browser` and run `npm run build`.

---

## ❓ FAQ & Troubleshooting

### Q: How do I add a new page?
1. Generate the standalone component:
   ```bash
   npx ng g c pages/pricing --standalone
   ```
2. Add the route in `src/app/app.routes.ts`:
   ```typescript
   {
     path: 'pricing',
     loadComponent: () => import('./pages/pricing/pricing-page.component').then(m => m.PricingPageComponent),
   }
   ```
3. Add `pricing` to `src/routes.txt` so it is statically pre-rendered at build time.
4. Add the link to `navigation.links` in `src/app/core/config/site.content.ts`.

### Q: How do I change the primary color theme?
The template uses Tailwind CSS 4 utility classes. To switch from emerald/stone to your brand color (e.g. indigo/slate or rose/zinc), update the color classes in `site.content.ts` or `src/styles.css`.
