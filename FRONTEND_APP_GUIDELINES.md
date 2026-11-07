# Modern Angular Frontend Application Guidelines & Standards

> **Stack Specification**: Angular 22+, Angular Material 22+, Tailwind CSS 4+, Angular SSR/SSG Prerendering, Netlify Serverless Static Hosting, Netlify Forms, TypeScript Strict, Dark/Light Theming, Strictly Angular Material UI Elements & Dialogs.

This document serves as the comprehensive engineering standard and blueprint for building enterprise-grade, high-performance, SEO-first Angular frontend applications. Use this specification to ensure architectural consistency, strict type safety, accessible design systems, and seamless deployment across projects.

---

## 1. Core Technology Stack & Version Matrix

| Technology | Minimum Version | Role & Description |
| :--- | :--- | :--- |
| **Angular** | `^22.0.0` | Latest Angular framework using Standalone Components, Signal-based reactivity, modern Control Flow (`@if`, `@for`, `@switch`, `@let`), and `inject()`. |
| **Angular Material** | `^22.0.0` | Official Material Design 3 component suite (`@angular/material`, `@angular/cdk`). All UI interactive components and modals MUST use this library. |
| **Tailwind CSS** | `^4.0.0` | Utility-first CSS framework for layout, responsive grid/flexbox, typography rhythm, animations, and dark-mode styling. |
| **Angular SSR / SSG** | `^22.0.0` | `@angular/ssr` configured for build-time static site prerendering (SSG) to achieve instantaneous First Contentful Paint (FCP) and optimal SEO. |
| **Hosting Platform** | Netlify | Global CDN hosting with edge caching, zero Node.js server maintenance in production, automated continuous deployment, and native Netlify Forms. |
| **TypeScript** | `^5.6.0` | Strict type checking (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`). |

---

## 2. Architectural Blueprint & Directory Structure

Organize the codebase following the clean modular **Core - Shared - Features** architecture:

```
src/
├── app/
│   ├── core/                          # Singleton services, global models, guards, interceptors
│   │   ├── services/
│   │   │   ├── theme.service.ts       # Signal-based Dark/Light theme manager & persistence
│   │   │   ├── seo.service.ts         # Meta tags, OpenGraph, Canonical, JSON-LD Schema.org
│   │   │   ├── netlify-form.service.ts# Form serialization & Netlify POST handler
│   │   │   └── data.service.ts        # Content repository & API client
│   │   └── models/                    # Global domain interfaces & types (Strict TS)
│   ├── shared/                        # Reusable dumb components, dialogs, pipes, directives
│   │   ├── components/
│   │   │   ├── navbar/                # Global navigation bar with MatToolbar & theme toggle
│   │   │   ├── footer/                # Standardized footer with links & social indicators
│   │   │   ├── section-header/        # Consistent section eyebrow, title & subtitle
│   │   │   └── stat-card/             # Metric highlight cards with MatCard & counters
│   │   └── dialogs/                   # Strictly Angular Material MatDialog implementations
│   │       ├── consultation-dialog/   # Inquiry & consultation modal with Netlify Form
│   │       └── service-detail-dialog/ # Drill-down detail modal for complex services
│   ├── features/                      # Route-level page components (lazy-loadable)
│   │   ├── home/                      # Starter kit home, quickstart & 5 pillars matrix
│   │   ├── features/                  # Architectural breakdown & modern tech stack
│   │   ├── best-practices/            # 5 Pillars of Discovery (SEO, AEO, LLMO, GEO, SSR)
│   │   ├── tasks/                     # Interactive Tasks CRUD, forms & mock API demo
│   │   ├── about/                     # About Chintap, mission & philosophy
│   │   └── contact/                   # Contact information & direct Netlify form
│   ├── app.component.ts               # Root component (Navbar + RouterOutlet + Footer)
│   ├── app.routes.ts                  # Application route definitions with prerender targets
│   └── app.config.ts                  # Root application providers (Router, SSR, HTTP, Material)
├── assets/
│   ├── brand/                         # Extracted SVG/PNG logos, emblems, mark variants
│   ├── icons/                         # Custom SVG icons if not available in Material Symbols
│   └── og-image.png                   # 1200x630 Social card preview for Twitter/LinkedIn
├── favicon.ico                        # Multi-resolution favicon (.ico)
├── index.html                         # Base HTML template with pre-rendered hidden forms & SEO
├── styles.scss                        # Material theme definition + Tailwind imports
└── netlify.toml                       # Netlify deployment configuration, caching & redirects
```

---

## 3. UI Component & Styling Standards

### 3.1 Strict Angular Material UI Rule
- **Mandatory Usage**: All structural controls, buttons, cards, form elements, icons, dividers, chips, tooltips, dialogs, and snackbars **MUST** be official Angular Material components:
  - `MatToolbar` (`mat-toolbar`)
  - `MatButton` (`mat-button`, `mat-raised-button`, `mat-flat-button`, `mat-stroked-button`, `mat-icon-button`)
  - `MatCard` (`mat-card`, `mat-card-header`, `mat-card-title`, `mat-card-content`, `mat-card-actions`)
  - `MatIcon` (`mat-icon`) using Material Symbols Outlined
  - `MatFormField`, `MatLabel`, `MatInput`, `MatSelect`
  - `MatChips` (`mat-chip-set`, `mat-chip`)
  - `MatDivider` (`mat-divider`)
  - `MatDialog` (`MatDialogRef`, `MatDialogTitle`, `MatDialogContent`, `MatDialogActions`)
  - `MatSnackBar` for feedback notifications
  - `MatTooltip` for accessibility hints
  - `MatExpansionModule` (`mat-accordion`, `mat-expansion-panel`) for collapsible content

### 3.2 Tailwind CSS Synergy
- Do **NOT** reinvent buttons or input fields with raw Tailwind.
- Use Tailwind CSS exclusively for:
  - Responsive layouts: `container mx-auto px-4`, `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
  - Flexbox alignment: `flex items-center justify-between`
  - Spacing & margins: `py-16`, `mt-6`, `space-y-4`
  - Background gradients & blurs: `bg-gradient-to-br from-slate-900 to-navy-950 backdrop-blur-md`
  - Typography scale: `text-4xl md:text-5xl font-extrabold tracking-tight`
  - Hover micro-interactions: `transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`

---

## 4. Modal & Dialog Standards (Strictly Angular Material)

> [!CAUTION]
> **Zero JavaScript or Native Browser Modals**: Never use `window.alert()`, `window.confirm()`, `window.prompt()`, Bootstrap modals, or bespoke JavaScript popup overlays.

All modals must be built using `@angular/material/dialog`:

```typescript
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl">
      <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 mat-dialog-title class="!m-0 text-2xl font-bold flex items-center gap-3">
          <mat-icon class="text-primary-600 dark:text-primary-400">{{ data.icon }}</mat-icon>
          {{ data.title }}
        </h2>
        <button
          type="button"
          mat-dialog-close
          aria-label="Close dialog"
          class="modal-close-btn w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
          title="Close dialog"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <mat-dialog-content class="!py-6 !px-0 text-slate-600 dark:text-slate-300 space-y-4">
        <p class="leading-relaxed text-base">{{ data.description }}</p>
        <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
          <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Scope of Coverage:</h4>
          <ul class="space-y-2">
            @for (item of data.points; track item) {
              <li class="flex items-start gap-2">
                <mat-icon class="text-emerald-500 !text-lg !w-5 !h-5 mt-0.5">check_circle</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="!px-0 !pt-4 border-t border-slate-200 dark:border-slate-800">
        <button mat-stroked-button mat-dialog-close>Close</button>
        <button mat-flat-button color="primary" (click)="onAction()">Get In Touch</button>
      </mat-dialog-actions>
    </div>
  `
})
export class ServiceDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ServiceDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  onAction(): void {
    this.dialogRef.close('action');
  }
}
```

Opening dialogs:
```typescript
const dialogRef = this.dialog.open(ServiceDialogComponent, {
  data: servicePayload,
  width: '640px',
  panelClass: 'custom-dialog-container',
  autoFocus: 'first-tabbable',
});
```

### 4.1 Pixel-Perfect Modal Close Button Standards (Strict Mandate)

> [!IMPORTANT]
> **Eliminating the "Off-Center X" Defect**: A recurrent visual defect in web and Angular applications is modal close button icons ("X") that sit visibly off-center — shifted slightly low, high, or awkwardly floating against the header. This specification enforces strict engineering rules so close icons are 100% centered with subpixel precision across every browser and device.

#### 1. Why Font Icons & Default `mat-icon-button` Drift Off-Center
- **Inline Formatting Context**: Angular Material's `.mat-mdc-icon-button` specifies `display: inline-block; text-align: center;` with padding, rather than establishing a true flex-centering container.
- **Vertical-Align Baseline**: Angular Material defaults `.mat-mdc-icon-button svg` and `.mat-icon` to `vertical-align: baseline`. The inline line-height box includes typographic ascender/descender leading, which forces the icon off the vertical geometric center by 1–3px.
- **Font-Metric Asymmetry in Glyph Ligatures**: The text string `<mat-icon>close</mat-icon>` uses the `Material Icons` webfont. Like most font glyphs, the character is positioned relative to a baseline intended for text strings, meaning the visual center of the "X" glyph does not match the 24×24 box center. When hovered, the circular focus ring or ripple highlights this asymmetry.
- **Header Alignment Mismatch**: When modal headers use `items-start` with a multi-line title/eyebrow block, naked close buttons pin to the top-right corner with no vertical balancing.

#### 2. Mandatory Modal Close Button Rules

| Requirement | Rule & Standard | Implementation |
| :--- | :--- | :--- |
| **Container Centering** | Always use `inline-flex` with `items-center justify-center` | `display: inline-flex !important; align-items: center !important; justify-content: center !important;` |
| **Vector Precision** | Use mathematical vector SVG instead of font glyphs | `<svg class="w-4 h-4" viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>` |
| **Symmetrical Framing** | Standardize circular button disc (`32x32px` standard) | `w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700` |
| **Accessibility** | Strict button semantics & keyboard focus ring | `type="button"`, `aria-label="Close dialog"`, `focus-visible:ring-2 focus-visible:ring-[#ea1c24]` |
| **Header Rhythm** | Coordinate vertical alignment with multi-line headers | Add `mt-1` when headers contain multi-line eyebrows, or `items-center` when single-line |

#### 3. Standard Component Template Blueprint

```html
<button
  type="button"
  (click)="dialogRef.close()"
  aria-label="Close dialog"
  class="modal-close-btn w-8 h-8 rounded-full flex items-center justify-center bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea1c24] cursor-pointer flex-shrink-0"
  title="Close dialog"
>
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>
```

#### 4. Global CSS Defense (`src/styles.css`)

Always maintain global rules that enforce flex centering across all CDK overlay panels:

```css
.modal-close-btn,
.mat-mdc-icon-button.modal-close-btn,
.cdk-overlay-pane .mat-mdc-dialog-container button[aria-label*="lose"],
.cdk-overlay-pane .mat-mdc-dialog-container button[aria-label*="Close"],
.cdk-overlay-pane .mat-mdc-dialog-container .modal-close-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  line-height: 1 !important;
}

.modal-close-btn svg,
.mat-mdc-icon-button.modal-close-btn svg,
.cdk-overlay-pane .mat-mdc-dialog-container button[aria-label*="lose"] svg,
.cdk-overlay-pane .mat-mdc-dialog-container button[aria-label*="Close"] svg {
  display: block !important;
  margin: auto !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
}
```

### 4.2 Unified Card Hover Standards (Consistent Subtle Elevation)

> [!IMPORTANT]
> **Subtle & Consistent Card Micro-Interactions**: All interactive and content cards across the Chintap website adhere to a unified hover elevation standard. Disparate hover states (e.g. static cards, aggressive multi-pixel jumps, or mismatched border colors) degrade visual cohesion. Every card must feel tactile, refined, and consistent.

#### 1. The Unified Card Hover Token

| Property | Base State | Hover State | Tailwind Utility Token |
| :--- | :--- | :--- | :--- |
| **Border Color** | `border-stone-200` / `dark:border-stone-800` | `border-stone-400` / `dark:border-stone-600` | `hover:border-stone-400 dark:hover:border-stone-600` |
| **Elevation / Shadow** | `shadow-sm` | `shadow-md` | `hover:shadow-md` |
| **Subtle Translation** | `translate-y-0` | `-translate-y-0.5` (-2px lift) | `hover:-translate-y-0.5` |
| **Timing & Ease** | — | 200ms cubic-bezier ease | `transition-all duration-200` |

#### 2. Standard Tailwind Class Combo
Apply this exact token to all card containers:
```html
<article class="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  <!-- Card Content -->
</article>
```

#### 3. Global CSS Utility (`.card-hover` / `.chintap-card`)
For non-Tailwind contexts or custom components, use the standardized class defined in `src/styles.css`:
```css
.card-hover,
.chintap-card {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.card-hover:hover,
.chintap-card:hover {
  border-color: #a8a29e !important;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04) !important;
  transform: translateY(-2px) !important;
}

html.dark .card-hover:hover,
html.dark .chintap-card:hover {
  border-color: #57534e !important;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 8px -1px rgba(0, 0, 0, 0.25) !important;
}
```

#### 4. Rules & Behavioral Constraints
- **Subtle Over Dramatic**: Limit translation to exactly `-translate-y-0.5` (-2px). Do not use aggressive jumps like `-translate-y-2` or scale magnification on full card containers.
- **Consistent Borders**: Do not use `hover:border-stone-300` or `hover:border-stone-700`; always use `hover:border-stone-400 dark:hover:border-stone-600` for clear, subtle contrast.
- **Preserve Micro-Interactions**: Nested elements (e.g. arrow SVGs translating on group hover `group-hover:translate-x-1.5`, or logo scale `group-hover:scale-105`) are encouraged, provided the parent card maintains the standard elevation.

---

## 5. Dual-Theme Architecture (Light & Dark Mode)

### 5.1 Theme Service Implementation
Theme state must be managed with Angular Signals, persisted in `localStorage`, and synced with the user's OS preference (`prefers-color-scheme`).

```typescript
// src/app/core/services/theme.service.ts
import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AppTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<AppTheme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('app-theme') as AppTheme | null;
      if (saved === 'dark' || saved === 'light') {
        this.currentTheme.set(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme.set(prefersDark ? 'dark' : 'light');
      }

      effect(() => {
        const theme = this.currentTheme();
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
        localStorage.setItem('app-theme', theme);
      });
    }
  }

  toggleTheme(): void {
    this.currentTheme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
```

### 5.2 Color Tokens & Material Synergy
Define an elegant palette that works across both light and dark backgrounds:
- **Corporate Primary**: Navy `#0B2545` (Light mode text/accent) / `#60A5FA` or `#93C5FD` (Dark mode contrast)
- **Growth Accent**: Emerald Teal `#008060` / `#0D7A68` (Light) / `#10B981` or `#34D399` (Dark)
- **Surfaces**:
  - Light: `#FFFFFF` (Surface), `#F8FAFC` (Canvas), `#E2E8F0` (Border)
  - Dark: `#0B1120` (Canvas), `#1E293B` (Surface), `#334155` (Border)

---

## 6. Angular 22 Static Site Generation (SSG) & Pre-rendering Architecture

Netlify operates as a high-performance global edge CDN. Running a heavy dynamic Node.js server runtime for marketing and showcase webapps introduces unnecessary cold-start latency, server maintenance overhead, and lambda billing.

The enterprise standard for Angular web applications is **Build-Time Static Site Generation (SSG)** using `@angular/build:application`, `@angular/ssr`, and `@angular/platform-server`. Every route is prerendered at build time into complete, fully-rendered static HTML files (`dist/<project>/browser/<route>/index.html`) delivered via Netlify edge CDN cache with **0ms cold start**, **100% crawlability**, and instant client-side hydration with zero event drop.

### 6.1 Core Dependencies & Version Consistency
Install the official SSR and platform server packages matching your Angular version:
```bash
npm install @angular/ssr@^22.2.0 @angular/platform-server@^22.2.0
```
> [!IMPORTANT]
> **Strict Version Parity**: Keep all `@angular/*` packages pinned to the identical major and minor version (e.g. `^22.2.2`). Never mix major versions (e.g., Angular 19 and 22).

### 6.2 Route Manifest (`src/routes.txt`)
Maintain an explicit route manifest file listing all canonical static routes to guarantee pre-rendering at build time:
```
/
/features
/best-practices
/tasks
/about
/contact
```

### 6.2.1 Route Definitions with Explicit Titles (`src/app/app.routes.ts`)
Always declare descriptive, distinctive `title` properties on every route definition in `src/app/app.routes.ts`.

> [!IMPORTANT]
> **Why Explicit Route Titles are Mandatory**:
> 1. **Social Link Previews**: Link crawlers and scrapers (WhatsApp, LinkedIn, Twitter/X, Facebook, iMessage) extract the page title and OpenGraph tags from the prerendered HTML. Missing or generic route titles result in identical preview cards across different URLs.
> 2. **Browser Tab Navigation**: Angular's router built-in `TitleStrategy` immediately updates the document title upon route transition without waiting for component lifecycle hooks.
> 3. **SSG Pre-rendering**: Angular SSR bakes the route's `title` into the `<title>` and `<meta property="og:title">` elements of `dist/<project>/browser/<route>/index.html`.

Example standard route configuration:
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePageComponent),
    title: 'Chintap Angular Starter | SEO, AEO, LLMO, GEO & SSR Ready Starter Kit'
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features-page.component').then(m => m.FeaturesPageComponent),
    title: 'Features & Architecture | Chintap Angular Starter'
  },
  {
    path: 'best-practices',
    loadComponent: () => import('./pages/best-practices/best-practices-page.component').then(m => m.BestPracticesPageComponent),
    title: 'SEO, AEO, LLMO, GEO & SSR Best Practices Guide | Chintap Angular Starter'
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks-page.component').then(m => m.TasksPageComponent),
    title: 'Tasks CRUD Module — Typed Forms & Mock API | Chintap Angular Starter'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About | Chintap Angular Starter'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: "Let's Talk | Contact Chintap Angular Starter"
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

### 6.3 Server Bootstrap Entry Point (`src/main.server.ts`)
The server entry point initializes the application during the build-time prerendering phase.

> [!CAUTION]
> **Critical Angular 22 Requirement (`BootstrapContext`)**:  
> In Angular 22, the server bootstrap function receives an optional `context: BootstrapContext` argument containing `{ platformRef }` from the route extractor. You **MUST** accept this `context` parameter and forward it as the 3rd argument to `bootstrapApplication(App, config, context)`.  
> Omitting `context` results in `Error: NG0401 Missing Platform` during prerender route extraction.

```typescript
// src/main.server.ts
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context?: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
```

### 6.4 Server Application Configuration (`src/app/app.config.server.ts`)
Provide server-side rendering capabilities by merging the base application config with `provideServerRendering()`:
```typescript
// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### 6.5 Client-Side Hydration with Event Replay (`src/app/app.config.ts`)
To achieve instantaneous interactivity without visual flickering or lost user interactions while JavaScript bundles are downloading, enable Angular's client hydration with event replay:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    // Enables client hydration and records user events before hydration to replay seamlessly
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
};
```

### 6.6 `angular.json` Build Target Configuration
Configure the `@angular/build:application` architect target with `server`, `prerender`, and `ssr: false`:
```json
"architect": {
  "build": {
    "builder": "@angular/build:application",
    "options": {
      "browser": "src/main.ts",
      "server": "src/main.server.ts",
      "prerender": {
        "discoverRoutes": true,
        "routesFile": "src/routes.txt"
      },
      "ssr": false,
      "tsConfig": "tsconfig.app.json",
      "assets": [
        {
          "glob": "**/*",
          "input": "public"
        }
      ],
      "styles": ["src/styles.scss"]
    }
  }
}
```
- `"server": "src/main.server.ts"`: Points the build system to the server bootstrap entry.
- `"prerender"`: Enables build-time SSG across all routes found in `routesFile` as well as unparameterized routes in the router.
- `"ssr": false`: Prevents outputting a runtime Node server bundle, ensuring pure static output for Netlify edge CDN hosting.

### 6.7 Pre-rendering Output Verification Checklist
After executing `npm run build`, verify the generated output in `dist/<project>/browser`:
1. **Route Subdirectories**: Verify that each route has its own dedicated directory containing `index.html` (e.g., `dist/<project>/browser/about/index.html`, `contact/index.html`, etc.).
2. **Pre-rendered Markup Inside `<app-root>`**: Inspect any generated `index.html` file; ensure `<app-root ng-version="22.x.x" ng-server-context="ssg">` contains full DOM markup, headings, paragraphs, and navigation elements.
3. **Route-Specific Title & Meta Tags**: Verify that the `<head>` of each route file contains the exact `<title>`, `<meta name="description">`, canonical `<link>`, and OpenGraph tags for that route.
4. **Hydration Scripts Present**: Verify `<script id="ng-state">` (serialized transfer state) and `window.__jsaction_bootstrap` (event dispatch contract) are present.

### 6.8 Netlify Hosting Configuration (`netlify.toml`)
Configure Netlify to publish the static browser directory, route SPA fallbacks, and serve secure headers:
```toml
[build]
  command = "npm run build"
  publish = "dist/<project-name>/browser"

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"

[[headers]]
  for = "/sitemap.xml"
  [headers.values]
    Content-Type = "application/xml; charset=utf-8"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 6.8.1 CI Dependency Resolution & Silent Deploy Failures (`.npmrc` & `NPM_FLAGS`)

> [!CAUTION]
> **The Silent Deploy Failure Trap (`npm error code ERESOLVE`)**:  
> Netlify runs `npm ci` on every push to `main`. In modern Angular 22 projects with `@angular/ssr` and `@angular/platform-server`, ecosystem patch versions frequently create minor peer dependency conflicts (e.g. `@angular/platform-server@22.2.3` requiring `@angular/common@22.2.3` while `@angular/common` in `package.json` is on `^22.2.2`).
>
> When this occurs, `npm ci` crashes with `npm error code ERESOLVE could not resolve peer dependency`.
>
> **The Critical Danger**: When `npm ci` fails, Netlify **cancels the deployment and silently continues serving the last successful build** (e.g., an outdated SPA version). Edge servers continue serving the stale build where all route URLs fall back to a single generic `index.html`. Developers assume their code was deployed, while live users and social scrapers receive outdated pages.
>
> **Mandatory Prevention Steps**:
> 1. **Project Root `.npmrc`**: Always commit a `.npmrc` file in the project root:
>    ```ini
>    legacy-peer-deps=true
>    ```
> 2. **Netlify Build Flags**: Include `NPM_FLAGS = "--legacy-peer-deps"` and `NODE_VERSION = "22"` under `[build.environment]` in `netlify.toml`.
> 3. **Local CI Verification**: Run `npm ci --dry-run` locally before pushing to confirm the lockfile installs cleanly without peer dependency blocking.

---

## 7. Netlify Forms Integration

Netlify detects HTML forms by scanning static HTML files at build time. Since Angular renders clientside, follow this two-step architecture:

### 7.1 Pre-rendered Hidden Form in `index.html`
Place a hidden HTML form inside `<body class="...">` in `src/index.html` so Netlify's deployment bot discovers all field names:

```html
<!-- Netlify Form Detection (Static Pre-render) -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="bot-field" />
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="tel" name="phone" />
  <input type="text" name="company" />
  <input type="text" name="service" />
  <textarea name="message"></textarea>
</form>
```

### 7.2 Angular Reactive Form Submission
Submit form data via `HttpClient` encoded as `application/x-www-form-urlencoded`:

```typescript
// src/app/core/services/netlify-form.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetlifyFormService {
  private readonly http = inject(HttpClient);

  submitForm(formName: string, data: Record<string, string>): Observable<string> {
    const payload = new URLSearchParams();
    payload.set('form-name', formName);
    for (const [key, value] of Object.entries(data)) {
      payload.set(key, value);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('/', payload.toString(), {
      headers,
      responseType: 'text',
    });
  }
}
```

Display confirmation via `MatDialog` (Modal-First policy, zero toasts for form submissions):
```typescript
this.netlifyForm.submitForm('contact', this.contactForm.getRawValue()).subscribe({
  next: () => {
    this.dialog.open(FeedbackDialogComponent, {
      data: {
        title: 'Inquiry Received',
        message: 'Thank you! Your request has been received. Our senior advisory team will contact you shortly.',
        isError: false
      },
      width: '460px',
      maxWidth: '92vw',
      panelClass: 'custom-dialog-container'
    });
    this.contactForm.reset();
  }
});
```

---

## 8. SEO, OpenGraph & Social Cards (WhatsApp, LinkedIn, X / Twitter)

To ensure link previews on **WhatsApp**, **LinkedIn**, and **Twitter / X** render official brand logos and summary cards flawlessly across mobile and desktop clients, follow these strict multi-platform standards:

### 8.1 Multi-Platform Crawler Compatibility Matrix

| Platform | Supported Aspect Ratios | File Size Limit | Key Required Tags | Notes / Crawler Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **WhatsApp** | `1.91:1` (Large) & `1:1` (Thumbnail) | **Strictly < 300 KB** (Ideal < 150 KB) | `og:image`, `og:image:secure_url`, `og:image:type`, `og:title`, `og:description` | WhatsApp crawler (`WhatsApp/2.x`) rejects images > 300KB. In chat bubbles, it auto-crops to a center `1:1` square; critical logo content must live in the center safe zone. |
| **LinkedIn** | `1.91:1` (`1200x627` or `1200x630`) | Max 5 MB | `og:image`, `og:title`, `og:description`, `og:url` | LinkedIn Post Inspector caches heavily. Requires absolute HTTPS URLs and non-empty description. |
| **Twitter / X** | `1.91:1` (Large) or `1:1` (Summary) | Max 5 MB | `twitter:card="summary_large_image"`, `twitter:image`, `twitter:title`, `twitter:description` | Renders edge-to-edge card below tweet. Falls back to `og:image` if `twitter:image` is omitted. |
| **Facebook / Meta** | `1.91:1` (`1200x630`) | Max 8 MB | `og:image`, `og:image:width`, `og:image:height`, `og:type` | Requires explicit width/height tags for instantaneous first-share rendering without cache delays. |
| **Slack / iMessage**| `1.91:1` or `1:1` | Max 2 MB | `og:image`, `og:title`, `og:description` | Reads standard OpenGraph protocol; displays rich inline preview cards. |

### 8.2 Safe Area Architecture for Universal Preview Rendering

A standard OpenGraph image is designed at `1200 x 630` pixels (`1.91:1` aspect ratio). However, because messaging apps like WhatsApp frequently crop the card to a **`1:1` square** (`630 x 630`) in chat lists and notifications:
- **Total Canvas**: `1200 x 630` px.
- **Center Safe Zone**: The horizontal center `630 x 630` px area (`x = 285` to `915`, `y = 0` to `630`).
- **Placement Rule**: Keep the entire core brand emblem, primary company wordmark, and tagline strictly within this center square. The outer left and right 285px margins must remain clean background canvas so no typography is clipped during square cropping.

### 8.3 Dual-Format Asset Provisioning

Maintain two primary formats in `public/assets/brand/`:
1. `og-image.png` (`1200 x 630`, RGB/RGBA, optimized PNG, ~139 KB): Default for high-DPI displays on LinkedIn, Twitter, and Facebook.
2. `og-image.jpg` (`1200 x 630`, 92% quality progressive JPEG, ~47 KB): Lightweight fallback for bandwidth-constrained messaging clients.
3. `og-square.png` (`800 x 800`, ~145 KB): Dedicated 1:1 square preview for platforms that request square metadata.

### 8.4 Required `<head>` Tags in `src/index.html`
```html
<head>
  <meta charset="utf-8" />
  <title>TreGrow Corporate Services | Strategic Financial Advisory</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Specialised guidance in corporate treasury, debt syndication, trade finance, FX risk management, and fractional CFO stewardship." />
  
  <!-- Canonical URL (Must match live production deployment) -->
  <link rel="canonical" href="https://tregrow.netlify.app/" />

  <!-- Favicons and Touch Icons -->
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/brand/favicon-16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png" />
  <meta name="theme-color" content="#0B2545" />

  <!-- OpenGraph Protocol (WhatsApp, LinkedIn, Facebook, Slack) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tregrow.netlify.app/" />
  <meta property="og:site_name" content="TreGrow Corporate Services" />
  <meta property="og:title" content="TreGrow Corporate Services | Strategic Financial Advisory" />
  <meta property="og:description" content="Specialised guidance in corporate treasury, debt syndication, trade finance, FX risk management, and fractional CFO stewardship. Rooted in over 20 years of real corporate finance leadership." />
  <meta property="og:image" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta property="og:image:secure_url" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="TreGrow Corporate Services Logo and Strategic Advisory Philosophy" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://tregrow.netlify.app/" />
  <meta name="twitter:title" content="TreGrow Corporate Services | Strategic Financial Advisory" />
  <meta name="twitter:description" content="Corporate treasury, debt syndication, trade finance, FX management, and fractional CFO leadership for growing enterprises." />
  <meta name="twitter:image" content="https://tregrow.netlify.app/assets/brand/og-image.png" />
  <meta name="twitter:image:alt" content="TreGrow Corporate Services Logo" />

  <!-- Schema.org JSON-LD Structured Data for Financial Service -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TreGrow Corporate Services",
    "alternateName": "TreGrow",
    "url": "https://tregrow.netlify.app/",
    "logo": "https://tregrow.netlify.app/assets/brand/logo.png",
    "image": "https://tregrow.netlify.app/assets/brand/og-image.png",
    "description": "Professional financial advisory firm providing specialised guidance in corporate treasury, debt syndication, trade finance, FX management, and fractional CFO services.",
    "telephone": "+919321631354",
    "email": "info@tregrow.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    }
  }
  </script>
</head>
```

### 8.4.1 Single OpenGraph Banner Policy (Never Multiple or Conflicting `og:image` Tags)

> [!WARNING]
> **Avoid Conflicting OpenGraph Image Tags**:  
> Never declare multiple `<meta property="og:image">` tags (e.g., declaring one 1200×630 landscape banner and one 1200×1200 square logo) or legacy `<link rel="image_src">`.
>
> **Why Multiple Tags Break Chat Previews**:  
> Messaging platform scrapers (WhatsApp, LinkedIn, Slack, iMessage) parse all declared image tags. If a secondary square image is present, crawlers often pick the square image and **downgrade the entire link preview from an expansive full-width rich banner into a tiny, cramped square thumbnail on the left**.
>
> **The Golden Rule**:
> 1. Declare **exactly one** high-resolution `1200 x 630` px landscape banner (`og:image` and `og:image:secure_url`).
> 2. Always declare explicit dimensions, MIME type, and alt text:
>    ```html
>    <meta property="og:image" content="https://<domain>/assets/brand/og-image.png" />
>    <meta property="og:image:secure_url" content="https://<domain>/assets/brand/og-image.png" />
>    <meta property="og:image:type" content="image/png" />
>    <meta property="og:image:width" content="1200" />
>    <meta property="og:image:height" content="630" />
>    <meta property="og:image:alt" content="Page Title — Brand" />
>    ```
> 3. Always pair with `<meta name="twitter:card" content="summary_large_image">`.

### 8.5 Dynamic Route Updates via `SeoService`
Page-level components (e.g. `/treasury-services`, `/fractional-cfo`) MUST call `SeoService.updateMeta()` in `ngOnInit`:
```typescript
this.seoService.updateMeta({
  title: 'Corporate Treasury Advisory',
  description: 'Trade financing, debt syndication, working capital optimization and FX risk strategy.',
  url: '/treasury-services'
});
```
Because Angular SSG pre-renders every route at build time into static HTML (`dist/<project>/browser/<route>/index.html`), social media crawlers receive these exact meta tags on initial request without executing JavaScript.

### 8.6 Social Platform Cache Invalidation & Live Edge Verification

> [!TIP]
> **Aggressive Platform Caching**:  
> Social chat platforms (especially WhatsApp) aggressively cache preview cards by exact URL for days or weeks. If a link was shared before metadata or SSG prerendering was deployed, WhatsApp will continue displaying its cached preview.
>
> **Verification Protocol**:
> 1. **Live Edge Verification via `curl`**: Always check what the live CDN edge is actively returning to crawlers:
>    ```bash
>    curl -sL https://<domain>/<route> | grep -E '<title>|og:title|og:description|og:image'
>    ```
> 2. **Cache-Busting Query Parameter**: During testing, append a query parameter (e.g. `https://<domain>/<route>?v=1`) to force WhatsApp and Slack to fetch a completely fresh copy of the HTML.
> 3. **Official Invalidation Tools**:
>    - **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) (immediately purges and re-scrapes preview cache).
>    - **Facebook / Meta**: [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) (click "Scrape Again" to clear WhatsApp/Facebook CDN cache).
>    - **Twitter / X**: [Card Validator / Tweet Composer preview](https://cards-dev.twitter.com/validator).

### 8.7 Search Engine Infrastructure: Robots.txt & Sitemap.xml
Every production webapp must ship with an official `robots.txt` and canonical XML `sitemap.xml` placed in the `public/` directory (automatically bundled to the root of `dist/<project>/browser/` during build):

#### 1. `public/robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://<production-domain>/sitemap.xml
```

#### 2. `public/sitemap.xml`
Generate a valid XML sitemap indexing all canonical prerendered routes with explicit priority and change frequencies:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://<production-domain>/</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://<production-domain>/features</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://<production-domain>/best-practices</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://<production-domain>/tasks</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://<production-domain>/about</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://<production-domain>/contact</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 8.8 Localhost & SSR URL Resolution Guard in `SeoService`
> [!WARNING]
> **Never Leak Localhost into Canonical or Social Meta Tags**:  
> In local development and during build-time SSR passes, `window.location.origin` may be `http://localhost:3000`, `http://localhost:4200`, or `undefined`. If your `SeoService` uses `window.location.origin` without checking, social crawlers or prerendered static HTML files will inadvertently embed localhost URLs!
>
> `SeoService` must filter out localhost/127.0.0.1 and always fall back to the production canonical domain:

```typescript
// src/app/core/services/seo.service.ts
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly productionOrigin = 'https://<production-domain>';
  readonly defaultOgImage = `${this.productionOrigin}/images/og-preview.jpg`;

  get siteBaseUrl(): string {
    try {
      if (typeof window !== 'undefined' && window.location && window.location.origin) {
        const origin = window.location.origin;
        // Never allow localhost or test runner origins into canonical/social meta
        if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
          return origin;
        }
      }
    } catch {
      // Fallback during SSR execution
    }
    return this.productionOrigin;
  }

  setSeoData(config: SeoConfig): void {
    const fullTitle = config.title.includes('Brand') ? config.title : `${config.title} — Brand`;
    this.titleService.setTitle(fullTitle);

    const baseUrl = this.siteBaseUrl;
    const resolvedUrl = config.url
      ? (config.url.startsWith('http') ? config.url : `${baseUrl}${config.url.startsWith('/') ? '' : '/'}${config.url}`)
      : baseUrl;

    const resolvedImage = config.image
      ? (config.image.startsWith('http') ? config.image : `${baseUrl}${config.image.startsWith('/') ? '' : '/'}${config.image}`)
      : this.defaultOgImage;

    // Standard HTML Meta
    this.metaService.updateTag({ name: 'description', content: config.description });

    // OpenGraph Protocol
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: resolvedUrl });
    this.metaService.updateTag({ property: 'og:image', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: resolvedImage });

    // Twitter / X Cards
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: resolvedImage });

    // Canonical link tag
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', resolvedUrl);
  }
}
```

---

## 9. TypeScript Strict Configuration

Maintain zero tolerance for implicit any and loose typing in `tsconfig.json`:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

---

## 10. New Project Kickoff Checklist

When spinning up a new Angular project adhering to this specification:
1. `npx -y @angular/cli@22 new <project-name> --style=scss --ssr=true --routing=true --strict=true`
2. `npm install @angular/material@22 @angular/cdk@22 tailwindcss @tailwindcss/postcss postcss`
3. `npm install @angular/ssr@^22.2.0 @angular/platform-server@^22.2.0` (ensure all `@angular/*` packages match version).
4. Configure `main.server.ts` with `(context?: BootstrapContext) => bootstrapApplication(App, config, context)` to prevent `NG0401`.
5. Configure `app.config.server.ts` with `provideServerRendering()` and `app.config.ts` with `provideClientHydration(withEventReplay())`.
6. Configure `ThemeService` with Signals and `prefers-color-scheme` synchronization.
7. Extract client logo into `assets/brand/logo.png`, `emblem.png`, `favicon.ico`, and `og-image.png` (1200x630).
8. Set up `index.html` with pre-rendered Netlify form `<form name="..." netlify hidden>` and OpenGraph tags.
9. Create `NetlifyFormService` for URL-encoded submissions with `MatSnackBar` feedback.
10. Build all interactive overlays using `MatDialog` (no native alerts or browser dialogs).
11. Add static routes to `src/routes.txt` and configure `"server"`, `"prerender"`, `"ssr": false` in `angular.json`.
12. Create `public/robots.txt` and `public/sitemap.xml` with canonical routes.
13. Add `netlify.toml` with `[build.environment] NODE_VERSION = "22"`, `NPM_FLAGS = "--legacy-peer-deps"`, redirect rules, caching, and MIME type headers for `robots.txt` and `sitemap.xml`.
14. Add `.npmrc` in project root with `legacy-peer-deps=true` to prevent silent deployment failures during Netlify `npm ci`.
15. Implement `SeoService` with production origin fallback for localhost and SSR passes, explicit `1200x630` banner dimensions, and single `og:image` policy.
16. Verify build and static route generation with `npm run build` (confirm `Prerendered X static routes` and check `dist/<project>/browser/<route>/index.html`).
17. Ensure unit tests pass with `npm test -- --watch=false`.

---

## 11. Mandatory Package Version Tracking & Footer Display

> [!IMPORTANT]
> **Zero-Exception Rule**: For every single change, feature, and update to the application, the `version` field in `package.json` MUST be incremented, and this version MUST be displayed clearly in the application footer.

### 11.1 Incrementing `package.json`
Whenever code changes, releases, or hotfixes occur, bump the version using semantic versioning (`major.minor.patch`):
```json
{
  "name": "chintap-app",
  "version": "1.7.31",
  ...
}
```

### 11.2 Importing Version via `resolveJsonModule`
Ensure `tsconfig.json` has `"resolveJsonModule": true`. In a dedicated service or directly in the footer component:

```typescript
// src/app/core/services/app-version.service.ts
import { Injectable } from '@angular/core';
import packageInfo from '../../../../package.json';

@Injectable({ providedIn: 'root' })
export class AppVersionService {
  readonly version = packageInfo.version;
}
```

### 11.3 Footer Rendering
Display the version badge in the global `FooterComponent`:
```html
<div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
  <span>Chintap</span>
  <span>•</span>
  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
    v{{ appVersion }}
  </span>
</div>
```

---

## 12. Sass Compiler Compatibility (`NG_BUILD_SASS_EMBEDDED`)

When building on macOS versions prior to Sonoma (e.g., Monterey / Ventura) or in custom CI environments, the native Dart VM binary in `sass-embedded` may fail with `Current Mac OS X version is lower than minimum supported version`.

To ensure 100% cross-platform compatibility without hanging or crashing, configure `NG_BUILD_SASS_EMBEDDED=false` in all `npm` scripts:

```json
"scripts": {
  "start": "NG_BUILD_SASS_EMBEDDED=false ng serve",
  "build": "NG_BUILD_SASS_EMBEDDED=false ng build",
  "watch": "NG_BUILD_SASS_EMBEDDED=false ng build --watch --configuration development"
}
```
This forces Angular CLI to use the pure-JS Dart Sass async compiler (`sass.initAsyncCompiler()`), guaranteeing reliable builds across all operating systems.

---

## 13. Mobile & Tablet Responsiveness Standards

### 13.1 Breakpoint Hierarchy
Modern Angular applications must be designed mobile-first and tested rigorously across standard device viewports:

| Device Category | Viewport Width | Key Tailwind Breakpoint | UI Layout Strategy |
| :--- | :--- | :--- | :--- |
| **Mobile Portrait** | `320px – 480px` | Default (no prefix) | Single-column layouts, stacked cards, full-width CTA buttons, sticky top navbar with hamburger drawer. |
| **Mobile Landscape / Small Tablet** | `481px – 767px` | `sm:` | 2-column metric cards, adjusted horizontal padding (`px-4 sm:px-6`). |
| **Tablet Portrait (iPad / Android Tab)** | `768px – 1023px` | `md:` | 2 to 3 columns max. Navigation drawer remains collapsed for multi-item menus (>5 items). |
| **Tablet Landscape / Small Laptop** | `1024px – 1279px` | `lg:` | 3 to 4 columns. Header navigation can expand ONLY if item count + logo fits without wrapping. |
| **Desktop & Large Displays** | `1280px+` | `xl:` & `2xl:` | Full multi-column grids, horizontal process pipelines, side-by-side executive profiles. |

### 13.2 Defensive Image Sizing (Preventing Unstyled Image Explosion)
- Never rely solely on utility classes (`class="h-12 w-auto"`) for critical brand images and logos. If CSS hydration is delayed or disabled, the browser displays the image's raw dimensions (often 1000px+), breaking the entire page layout.
- **Mandatory Practice**: Always supply explicit inline height and object-fit constraints on `<img>` tags:
  ```html
  <img
    src="assets/brand/logo.png"
    alt="Company Logo"
    height="48"
    style="height: 48px; max-height: 48px; max-width: 220px; width: auto; object-fit: contain;"
    class="h-10 sm:h-12 w-auto object-contain" />
  ```

### 13.3 Navigation Collapse Rules for Multi-Page Apps
- If the navbar contains more than 5 route links, do **NOT** expand at `lg:` (1024px).
- A 1024px tablet in portrait or narrow window cannot fit 8 links + logo + CTA buttons without wrapping.
- **Rule**: Set desktop navigation to `hidden xl:flex` and hamburger button to `xl:!hidden`. This ensures iPad and tablet users always receive the touch-friendly mobile drawer menu.

### 13.4 Touch Targets & Interactive Elements
- In accordance with WCAG 2.2 and Material Design 3 guidelines:
  - All interactive buttons, icon buttons, menu links, and form fields must maintain a minimum touch target area of **48 × 48 px**.
  - In mobile drawers, navigation links must have generous vertical padding (`py-3 sm:py-3.5`) to prevent accidental adjacent taps.

### 13.5 Responsive Modals & Dialogs (`MatDialog`)
- When opening Material Dialogs (`@angular/material/dialog`), always enforce responsive sizing:
  ```typescript
  this.dialog.open(MyDialogComponent, {
    width: '560px',
    maxWidth: '95vw',
    maxHeight: '90vh',
    panelClass: 'custom-dialog-container'
  });
  ```
- Dialog action bars on mobile must stack or provide full-width action buttons for thumb accessibility:
  ```html
  <mat-dialog-actions class="flex flex-col-reverse sm:flex-row justify-end gap-2">
  ```

---

## 14. Tailwind CSS v4 & PostCSS Setup in Angular

Per official Tailwind CSS documentation for Angular:
1. Install packages: `tailwindcss`, `@tailwindcss/postcss`, `postcss`.
2. Create `.postcssrc.json` in the project root:
   ```json
   {
     "plugins": {
       "@tailwindcss/postcss": {}
     }
   }
   ```
3. Separate Sass and Tailwind into dedicated stylesheets in `angular.json`:
   ```json
   "styles": [
     "src/styles.scss",
     "src/styles.css"
   ]
   ```
   - `src/styles.scss`: Contains Angular Material M3 theme (`@use '@angular/material' as mat;`).
   - `src/styles.css`: Contains `@import "tailwindcss";`, `@source "./src/**/*.{html,ts}";`, and dark theme variants.
   This guarantees that PostCSS processes Tailwind directives directly without Sass parser interference.

---

## 15. Web Accessibility Standards (WCAG 2.2 AA Compliance)

Enterprise applications must ensure full accessibility for users navigating with screen readers, keyboard-only input, or high-contrast assistive tech.

### 15.1 Semantic Landmarks & Hierarchy
- **Header Landmark**: `<header role="banner" class="...">`
- **Navigation Landmark**: `<nav aria-label="Main Navigation" class="...">`
- **Main Landmark**: `<main id="main-content" role="main" tabindex="-1" class="...">`
- **Footer Landmark**: `<footer role="contentinfo" class="...">`
- **Heading Order**: Strictly preserve hierarchical progression: `<h1>` (one per page), `<h2>` (section titles), `<h3>` (card and subsection headers), `<h4>` (list and item headers). Never skip levels.

### 15.2 Skip to Main Content Link
Every page must provide a hidden skip link as the very first focusable element in the DOM:
```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-semibold text-sm transition-all">
  Skip to main content
</a>
```

### 15.3 ARIA Attributes on Interactive Controls
- **Hamburger / Drawer Toggles**:
  ```html
  <button
    mat-icon-button
    (click)="mobileMenuOpen.set(!mobileMenuOpen())"
    [attr.aria-expanded]="mobileMenuOpen()"
    aria-controls="mobile-navigation"
    aria-label="Toggle navigation menu">
    <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
  </button>
  ```
- **Theme Toggles**: Use high-precision inline SVG icons for instant rendering without web font layout shifts or missing ligatures. The darkmode switch uses an elegant crescent moon SVG icon (`d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"`) for switching to dark mode, and a radiant sun with rays SVG icon when dark mode is active:
  ```html
  <button
    type="button"
    (click)="themeService.toggleTheme()"
    [attr.aria-label]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
    [matTooltip]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
    @if (themeService.isDark()) {
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2m-7.07-15.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2m-15.66 5.66 1.41-1.41m11.32-11.32 1.41-1.41" />
      </svg>
    } @else {
      <!-- Crescent icon for darkmode switch -->
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    }
  </button>
  ```
- **Icon-Only Buttons & Action Triggers**: Every icon-only button MUST specify a descriptive `aria-label` and `matTooltip`.

### 15.4 Focus Rings & Keyboard Navigation
- Never remove outlines without providing a visible focus indicator:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`
- All interactive links, cards, and buttons must be accessible via `Tab` and activatable via `Enter` or `Space`.

### 15.5 Color Contrast & Typography
- Minimum contrast ratio of **4.5:1** for standard body text against background in both light and dark themes.
- Minimum contrast ratio of **3:1** for bold headings, large text (18pt+ / 14pt bold+), and essential UI control borders.
- Slate neutral colors: Use `text-slate-700 dark:text-slate-300` for readable paragraph text; avoid excessively low-contrast greys (`text-slate-400` only for non-critical secondary captions).

### 15.6 Form Accessibility
- Every input field must have an explicit `<mat-label>` and clear placeholder.
- Required inputs must have `required` and `aria-required="true"`.
- Real-time errors must be announced with `<mat-error>`.

### 15.7 Permitted ARIA Attributes on Generic Containers (`aria-prohibited-attr` Prevention)
- Under W3C ARIA specifications and Axe-core / Lighthouse a11y audits, generic containers (`<div>`, `<span>`) **cannot** have naming attributes (`aria-label`, `aria-labelledby`) without an explicit semantic ARIA role.
- **Rule**: Whenever applying `aria-label` or `aria-live` to a generic element (such as full-screen loaders, progress backdrops, or dynamic alert regions), you **MUST** assign an explicit semantic role (e.g. `role="status"`, `role="region"`, or `role="progressbar"`).
- **Prohibited by Axe-Core / Lighthouse**:
  ```html
  <!-- FAILS AUDIT: Generic div cannot take aria-label without role -->
  <div aria-live="polite" aria-label="Loading page" class="fixed inset-0 z-50 ...">
  ```
- **Compliant Standard**:
  ```html
  <!-- PASSES AUDIT: Semantic role="status" creates well-formed accessibility tree -->
  <div role="status" aria-live="polite" aria-label="Loading page" class="fixed inset-0 z-50 ...">
  ```

---

## 16. Concise Button Label Standards

To maintain a clean, confident executive tone and prevent visual clutter across desktop, tablet, and mobile viewports:
- **Rule**: Keep all button labels short, punchy, and direct (typically 1 to 2 words).
- **Prohibited**: Verbose, sentence-like action buttons (e.g., `Submit Consultation Request`, `Explore All Treasury Services & Deep Dives`, `Speak with Our Advisors`, `View All 6 CFO Domains`).
- **Standard Button Lexicon**:

| Verbose Phrasing (Avoid) | Concise Standard (Use) | Typical Context |
| :--- | :--- | :--- |
| `Book Consultation` / `Book Strategy Consultation` | `Inquire` / `Get Started` | Navbar, Hero & Section CTA |
| `Submit Consultation Request` / `Submit Request` | `Submit` / `Send` | Form dialogs, contact forms |
| `Transmitting to Advisors...` / `Submitting...` | `Sending...` | Form loading states |
| `View All X Scopes` / `View Full Scope` | `Details` | Service and category cards |
| `Explore Treasury Services` | `Services` | Hero alternate link |
| `View All 6 CFO Domains` | `Learn More` / `View All` | Cross-link banners |
| `Schedule Leadership Session` / `Connect with Advisors` | `Connect` | Leadership cards & dialogs |
| `Executive Bio Modal` | `Bio` | Leadership bio trigger |
| `Speak with Our Advisors` / `View Contact Details` | `Contact Us` | About & CTA links |

---

## 17. Modal-First Confirmations vs Toasts Policy

> [!IMPORTANT]
> **Zero Toasts for Submissions**: Form submissions, inquiries, and status outcomes MUST use a centered, accessible Material dialog (`MatDialog`) instead of edge snackbar toasts.

- **Why**: Snackbar toasts in the corner or bottom edge are easily missed by executives on wide displays, may be obscured on mobile browsers, and look informal for corporate advisory transactions.
- **Implementation**:
  - Use `FeedbackDialogComponent` with `MatDialog` containing:
    - Status icon circle (`check_circle` in emerald green)
    - Clear title (`Inquiry Received`)
    - Courteous confirmation paragraph specifying senior advisory response timeframe (24 hours)
    - Direct corporate email (`hello@chintap.com`)
    - Single, simple dismiss button (`OK`)
  - Dismissing the modal cleanly leaves the user on their page without lingering notification bars.

---

## 18. Technical SEO, GEO & AI Search Optimization (LLMO) Standards

Modern web applications must be fully indexable and comprehensible by traditional search engines (Google, Bing) and AI-driven answer engines (Perplexity, ChatGPT Search, Claude, Google Gemini).

### 18.1 Canonical Domain Governance & 301 Redirect Rules
- **Single Canonical Source**: Every application must enforce a single canonical domain (e.g. `https://chintap.com/`).
- **Direct 1-Hop 301 Redirects**:
  - `http://chintap.com/*` -> `https://chintap.com/:splat` (301)
  - `https://www.chintap.com/*` -> `https://chintap.com/:splat` (301)
  - `https://chintap.netlify.app/*` -> `https://chintap.com/:splat` (301)
- **Zero Redirect Chains**: Avoid multi-hop redirects (e.g., `http://www` -> `https://www` -> `https://`). Redirect rules in `_redirects` or `netlify.toml` must route non-canonical hosts directly to the final HTTPS canonical URL.
- **Canonical Meta Tag**: Every page must output `<link rel="canonical" href="https://chintap.com/route">` matching the exact rendered path.

### 18.2 Robots Directives & Standard Compliance (`robots.txt`)
- **Standard Directives Only**: Use only RFC-compliant, search-engine-recognized directives in `robots.txt`:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://chintap.com/sitemap.xml
  ```
- **Avoid Non-Standard Directives**: Custom directives like `LLM-Reference:` or `LLM-Context:` are non-standard and trigger syntax warnings in search engine parsers. Reference machine-readable resources via clean comments instead:
  ```txt
  # LLM Context: https://chintap.com/llms.txt
  # Full Documentation: https://chintap.com/contents.md
  ```

### 18.3 Machine-Readable Context for Generative Engines (`llms.txt` & `contents.md`)
- **`public/llms.txt`**: Concise, highly-structured Markdown file outlining:
  - Brand identity, philosophy, and positioning.
  - Physical office address and contact points.
  - Complete list of primary routes and page purposes.
  - Verified technology partners and external platforms.
- **`public/contents.md`**: Comprehensive textual export of all website copy, section by section. Enables AI search agents, automated summarizers, and retrieval-augmented pipelines to read complete site content without executing client-side JavaScript.
- **Static Asset Routing**: Both files must be placed in `public/` so they are copied directly to the build root and served as raw `text/plain` or `text/markdown` with HTTP 200, never falling back to `index.html`.

### 18.4 Structured Data Graphs (JSON-LD Schema.org)
- **Unified `@graph` Structure**: Inject a comprehensive Schema.org JSON-LD graph into `src/index.html` or dynamically via `SeoService`:
  - `Organization` / `ProfessionalService`: Name, alternate names, legal name, URL, logo, geo-coordinates, postal address, and contact points.
  - `WebSite`: Publisher `@id`, search URL, name.
  - `WebPage` & `BreadcrumbList`: Accurate hierarchy and page metadata for each route.
- **Entity Consistency**: All details (company name, street address, postal code, phone, email, partner links) must be 100% identical between Schema.org JSON-LD, visible HTML microdata (`itemscope`, `itemprop`), Markdown exports, and header metadata.

### 18.5 Route Pre-rendering (SSG) & Static Asset Integrity
- **Full Static Pre-rendering**: Angular SSG (`@angular/ssr`) must pre-render every public route at build time. When a web crawler or bot requests `/building-teams`, the server must return complete semantic HTML with `<h1>`, `<p>`, and navigation elements — not an empty `<app-root></app-root>`.
- **404 Handling**: Unrecognized routes must resolve to a customized 404 template or proper HTTP status code, not infinite client-side redirect loops.

### 18.6 HTTP Security, CSP & Caching Headers
Configure headers in `public/_headers` and `netlify.toml`:
- **Immutable Static Assets**: `/*.[hash].js`, `/*.[hash].css`, `/images/*`, `/fonts/*`:
  `Cache-Control: public, max-age=31536000, immutable`
- **Dynamic & Discovery Manifest Files**: `/index.html`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/contents.md`, `/.well-known/ard.json`, `/well-known/ard.json`, `/ard.json`:
  `Cache-Control: public, max-age=0, must-revalidate`
  `Access-Control-Allow-Origin: *`
- **Enterprise Security & Content Security Policy (CSP)**:
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      X-Content-Type-Options = "nosniff"
      X-Frame-Options = "DENY"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "geolocation=(), camera=(), microphone=(), payment=()"
      Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'none'; object-src 'none'; base-uri 'self';"
  ```

### 18.7 Production Verification Checklist (Live vs Local)
Before declaring an SEO or release milestone complete, execute two distinct verification passes:
1. **Local Build & Test Verification**:
   - `npm test -- --watch=false` (all unit and SEO assertions pass).
   - `npm run build` (SSG pre-renders all 8 routes without hydration errors).
   - Verify generated files in `dist/*/browser/` (`robots.txt`, `sitemap.xml`, `llms.txt`, `contents.md`, and static HTML for all routes).
2. **Live Production Remote Verification**:
   - Query all canonical routes (`https://chintap-angular-starter.netlify.app/`, `/features`, `/best-practices`, `/tasks`, `/about`, `/contact`, `/404`) with `curl -ILs` to confirm HTTP 200.
   - Verify direct 301 redirects from `http://`, `www.`, and `*.netlify.app`.
   - Verify `robots.txt`, `sitemap.xml`, `llms.txt`, and `contents.md` return HTTP 200 with matching Content-Type and accurate entity data.

---

## 19. Brand Visual Architecture, High-Resolution Assets & Generation Pipeline

To maintain pristine visual fidelity across 4K displays, marketing presentations, and responsive devices, all brand assets adhere to a strict mathematical vector specification and automated high-resolution export pipeline.

### 19.1 Brand Identity & Emblem Geometry

- **The Thinking Gesture Emblem**:
  - Symbolizes the reflective moment of ideation ("tapping one's chin") combined with the physical/digital tap interaction.
  - **Red Idea Disc**: Mathematically perfect circular arc centered at $(626, 401)$ with radius $R = 204\text{px}$ in Electric Red (`#EA1C24`).
  - **Fingertip Cutout**: Semicircular pill contour offset by $33\text{px}$ around the index fingertip, centered at $(626, 484)$ with radius $r = 107\text{px}$ descending into straight vertical boundary channels ($x = 519\text{px}$ and $x = 733\text{px}$).
  - **Gesture Hand**: Smoothly contoured index finger (width $148\text{px}$), angled thumb ($45^\circ$), and rounded wrist base. Hand is charcoal `#111111` in Light Mode and pure white `#FFFFFF` in Dark Mode.
- **Wordmark Standards**:
  - `chin` in Charcoal/Black (`#111111`) or White (`#FFFFFF`) depending on theme.
  - `tap` in Electric Red (`#EA1C24`).
  - Font: `Poppins`, 900 Black weight, tracking `-0.025em`.
- **Brand Tagline & Pillars**:
  - `Things. Apps. Possibilities.` (`Space Grotesk`, 700 Bold, uppercase tracking `0.24em`).
  - Foundational Philosophy: *"The world doesn't divide its problems into physical and digital categories. Neither should Chintap."*

### 19.2 Authoritative Asset Suite Inventory

| Asset Category | File Path | Dimensions | Description |
| :--- | :--- | :--- | :--- |
| **Vector Emblems** | `public/images/chintap-emblem.svg` | Vector | Adaptive SVG with `prefers-color-scheme` CSS |
| | `public/images/chintap-emblem-light.svg` | Vector | Dedicated light mode master (Black hand, Red disc) |
| | `public/images/chintap-emblem-dark.svg` | Vector | Dedicated dark mode master (White hand, Red disc) |
| **Master Emblem PNGs** | `public/images/chintap-emblem-light-mode.png` | $2048 \times 2048$ | Transparent master PNG for light backgrounds |
| | `public/images/chintap-emblem-dark-mode.png` | $2048 \times 2048$ | Transparent master PNG for dark backgrounds |
| **Brand Logo Lockups** | `public/images/chintap-brand-logo.svg` | $1000 \times 1000$ | Master square vector brand lockup |
| | `public/images/chintap-brand-logo-horizontal.svg` | $1200 \times 400$ | Master horizontal vector brand lockup |
| | `public/images/chintap-brand-white-bg-2048.png` | $2048 \times 2048$ | Clean white background square lockup |
| | `public/images/chintap-brand-url-white-bg-2048.png` | $2048 \times 2048$ | Clean white background square lockup with website URL badge (`chintap.com`) [Master HQ] |
| | `public/images/chintap-brand-url-white-bg.png` | $1024 \times 1024$ | Clean white background square lockup with website URL badge [Web-optimized] |
| | `public/images/chintap-brand-dark-2048.png` | $2048 \times 2048$ | Deep dark `#0C0A09` background square lockup |
| | `public/images/chintap-brand-2048.png` | $2048 \times 2048$ | Transparent background square lockup |
| | `public/images/chintap-brand-horizontal-white-bg-2400.png` | $2400 \times 800$ | White background horizontal brand lockup |
| | `public/images/chintap-brand-horizontal-dark-2400.png` | $2400 \times 800$ | Dark background horizontal brand lockup |
| | `public/images/chintap-brand-horizontal-2400.png` | $2400 \times 800$ | Transparent horizontal brand lockup |
| | `public/images/chintap-brand.png` | $1024 \times 1024$ | Web-optimized square lockup downsample |
| **Presentation Cards** | `public/images/chintap-brand-card-2400.png` | $2400 \times 1260$ | White presentation card with red accent bar |
| | `public/images/chintap-brand-card-dark-2400.png` | $2400 \times 1260$ | Dark presentation card with red atmospheric aura |
| **Marketing Graphics** | `public/images/chintap-marketing-pillars.svg` | $1200 \times 630$ | Vector graphic detailing the 3 core pillars (*Ideas don't come with a format*) |
| | `public/images/chintap-marketing-pillars.png` & `.jpg` | $1200 \times 630$ | Standard marketing card (1.91:1) rendered via Chrome Headless |
| | `public/images/chintap-marketing-pillars-2400.png` | $2400 \times 1260$ | Native 2x retina master rendered via Chrome Headless |
| | `public/images/chintap-marketing-square-2048.png` | $2048 \times 2048$ | Square marketing card with pillar breakdowns |
| | `public/images/chintap-marketing-square-trans-2048.png` | $2048 \times 2048$ | Transparent square marketing graphic |
| | `public/images/chintap-hero-showcase-2400.png` | $2400 \times 1350$ | Hero showcase visual (physical + digital bridge) |
| **OpenGraph & Social** | `public/images/chintap-og.svg` | $1200 \times 630$ | Vector OpenGraph master template with centered emblem, wordmark, tagline & pill |
| | `public/images/chintap-og.png` & `.jpg` | $1200 \times 630$ | High-contrast social preview cards rendered via Chrome Headless (Poppins:wght@900) |
| | `public/images/chintap-og-preview.png` & `.jpg` | $1200 \times 630$ | High-contrast social preview cards matching OpenGraph standard |
| | `public/images/chintap-og-no-url.svg` | $1200 \times 630$ | Vector OpenGraph master without website badge |
| | `public/images/chintap-og-no-url.png` & `.jpg` | $1200 \times 630$ | Social preview cards without website URL badge |
| **Favicons & App Icons** | `public/favicon.svg` | Vector | Adaptive browser favicon with theme switching |
| | `public/favicon.ico` | Multi-res | 16x16, 32x32, 48x48 icon container |
| | `public/favicon.png` | $64 \times 64$ | High-DPI PNG favicon |
| | `public/apple-touch-icon.png` | $180 \times 180$ | Light mode Apple Touch Icon with safe padding |
| | `public/images/apple-touch-icon-dark.png` | $180 \times 180$ | Dark mode Apple Touch Icon with safe padding |

### 19.3 Automated Build Script (`scripts/build-brand-assets.sh`)

All brand assets are generated deterministically via an in-repo shell script utilizing Headless Google Chrome (for exact Google Fonts rendering like `Poppins:wght@900` and subpixel typography), macOS native `sips` (for bicubic/Lanczos image downsampling and format conversions), and `rsvg-convert` (for vector-only emblem rasterization).

To re-generate or update all assets, run:

```bash
# Via npm script
npm run build:brand

# Or directly via bash
bash scripts/build-brand-assets.sh
```

**Asset Backups**:
Whenever brand modifications take place, pre-existing assets are backed up to versioned directories (e.g., `public/brand-backup-v1.5.1/`) to prevent unrecoverable overwrites.

### 19.4 Page Load Indicators & Route Transition Spinner

To eliminate visual jarring, blank white flashes, or unresponsive pauses during navigation across lazy-loaded routes:
1. **Initial HTML Pre-Bootstrap Loader (`src/index.html`)**:
   - Inlined directly within `<app-root></app-root>` using vanilla CSS and system theme detection (`@media (prefers-color-scheme: dark)`).
   - Zero JavaScript dependency: Displays instantaneously (0ms) while browser downloads and parses Angular bundles.
   - Automatically unmounted and replaced when Angular bootstraps the root component.
2. **In-App Route Navigation Spinner (`src/app/app.ts` & `src/app/app.html`)**:
   - Subscribes to Angular `Router` events (`NavigationStart`, `NavigationEnd`, `NavigationCancel`, `NavigationError`) via a reactive signal `isNavigating`.
   - Renders a subtle top accent progress bar (`#ea1c24` pulse line) across the viewport.
   - Displays a centered, accessible micro-spinner with `role="status"` and `backdrop-blur` during lazy chunk retrieval, ensuring smooth visual feedback.

---

## 20. Core Web Vitals (CWV) & Zero-CLS Performance Standards (Lighthouse 100/100)

To achieve top-tier PageSpeed Insights scores (99–100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO, 4/4 Agentic Browsing), frontend applications must eliminate all layout shifts, non-composited animations, and critical path request chain latency.

### 20.1 Cumulative Layout Shift (CLS = 0.000) Target
Layout shifts degrade user experience and penalize search engine ranking. Applications must enforce engineering patterns that achieve a **0.000 CLS score**.

### 20.2 Web Font Preload & Critical Latency Optimization
- **The Defect**: Relying on external CSS `@import` chains (e.g. Google Fonts stylesheet loading font binaries) delays font parsing until after the CSSOM tree is constructed. This creates a severe Flash of Unstyled Text (FOUT) or Flash of Invisible Text (FOIT) causing layout shifts upon font arrival.
- **The Standard**: Preload critical `.woff2` font files directly in the `<head>` of `src/index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLBT5Z1xlFd2JQEk.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **Font Pruning**: Unused decorative fonts (e.g. WindSong or unused weights) must be purged from stylesheets and templates to minimize initial critical path byte transfers.

### 20.3 The Web Font Ligature Flash Defect (Above-the-Fold Inline SVG Rule)
- **The Defect**: Angular Material's `<mat-icon>` uses the `Material Icons` web font (~126 KiB). Ligatures work by rendering raw text strings (e.g. `<mat-icon>play_arrow</mat-icon>` or `<mat-icon>menu</mat-icon>`). Before the font file loads, browsers render the literal words `"play_arrow"` or `"menu"` in the document fallback font, expanding the container width and causing severe CLS when the glyph finally replaces the text.
- **The Mandate**: All above-the-fold interactive elements (hero CTA icons, navigation toggles, theme toggle buttons, and modal close buttons) **MUST** use high-precision inline SVG vectors (`<svg ...>`) with explicit `viewBox`, `stroke-width`, and `aria-hidden="true"`.
- **Hero CTA Button Example**:
  ```html
  <button mat-flat-button class="!rounded-full !px-8 !py-4 font-semibold text-base shadow-sm">
    <span class="flex items-center gap-2">
      <!-- Inline SVG prevents text ligature flash & eliminates CLS -->
      <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <span>{{ ctaText }}</span>
    </span>
  </button>
  ```

### 20.4 GPU-Composited Transitions (Eliminating Non-Composited Animations)
- **The Defect**: Using `transition: all` or transitioning `box-shadow`, `width`, `height`, or `top` forces style invalidations and layout recalculations on the browser's main thread during every frame. Lighthouse flags this as *"Avoid non-composited animations"*.
- **The Mandate**: All CSS transitions must be scoped exclusively to compositor-accelerated properties (`transform`, `translate`, `scale`, `rotate`, `opacity`) and non-layout paint properties (`color`, `background-color`, `border-color`):
  ```css
  /* src/styles.css */
  *, ::before, ::after {
    transition-property: transform, translate, scale, rotate, opacity, color, background-color, border-color !important;
  }
  ```

---

## 21. Agentic Resource Discovery (ARD) Specification (§4.2 Formal Schema)

Modern web applications must be fully discoverable and readable by autonomous AI agents, web crawlers, and LLM-powered browser agents (Perplexity, ChatGPT Operator, Claude Computer Use, Google Gemini, and Chrome DevTools Agentic Browsing).

### 21.1 Manifest Endpoints & Mirroring
To ensure 100% agent reach regardless of crawler URL normalization:
1. `/.well-known/ard.json` (Canonical primary discovery endpoint per IETF RFC 8615)
2. `/well-known/ard.json` (Mirrored for crawlers that strip leading dot prefixes)
3. `/ard.json` (Convenience root mirror)

### 21.2 Formal §4.2 Schema Conformance
The manifest must adhere strictly to the ARD formal specification:
```json
{
  "schema_version": "1.0",
  "manifest_version": "1.0.0",
  "canonical_url": "https://chintap.com/.well-known/ard.json",
  "site_title": "Chintap",
  "site_description": "Curious by nature. Building things, apps, and possibilities across physical and digital disciplines.",
  "resources": [
    {
      "urn": "urn:air:chintap.com:docs:llms-txt",
      "name": "LLMs Context File",
      "description": "Structured Markdown overview for AI agents, language models, and automated summarizers.",
      "content_type": "text/markdown",
      "url": "https://chintap.com/llms.txt",
      "tags": ["llms", "context", "overview"]
    },
    {
      "urn": "urn:air:chintap.com:docs:full-contents",
      "name": "Full Website Contents",
      "description": "Comprehensive textual export of all page content, offerings, and philosophies.",
      "content_type": "text/markdown",
      "url": "https://chintap.com/contents.md",
      "tags": ["documentation", "full-text", "knowledge-base"]
    }
  ]
}
```

### 21.3 Formal Resource URN Scheme
All discoverable resources must be assigned a unique Uniform Resource Name (URN) adhering to the AIR namespace:
`urn:air:<domain>:<category>:<resource-id>`
- Example: `urn:air:chintap.com:docs:llms-txt`
- Example: `urn:air:chintap.com:api:v1:curriculum`

### 21.4 CORS & Edge Cache Governance
Discovery manifests must be publicly accessible to cross-origin AI agents without CORS blocking:
- `Access-Control-Allow-Origin: *`
- `Cache-Control: public, max-age=0, must-revalidate`
- `Content-Type: application/json; charset=utf-8`

### 21.5 Agentic Browsing Verification Pass
Verify that Chrome DevTools and Lighthouse report **4/4 Agentic Browsing audits passed**:
1. Accessibility tree is well-formed (`role` on interactive elements).
2. Elements must only use permitted ARIA attributes (no `aria-prohibited-attr`).
3. Discoverable machine-readable manifests (`ard.json`, `llms.txt`, `contents.md`).
4. Static semantic HTML rendered via build-time SSG.

---

## 22. Tech Stack Logos, Zero-Distortion Rule & Nominative Fair Use

### 22.1 Zero-Distortion Mandate (Strict Aspect Ratio Preservation)
- **The Rule**: Brand logos, framework badges, and tech stack emblems must **NEVER** be stretched, squeezed, or distorted under any circumstances.
- **The Defect**: Setting `width: 100%; height: 100%` on SVG containers with mismatched aspect ratios or wrapping `<img>` tags without `object-fit: contain` distorts recognizable trademarks.
- **Standard Container Blueprint**:
  - Always enforce a 1:1 square container with centered flex alignment:
    ```html
    <div class="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 p-2.5 flex items-center justify-center">
      <app-tech-logo [nameKey]="feature.logoKey" [name]="feature.title" size="lg"></app-tech-logo>
    </div>
    ```
  - Vector SVGs must include a square `viewBox` (e.g. `viewBox="0 0 128 128"` or `viewBox="0 0 24 24"`) and `preserveAspectRatio="xMidYMid meet"`.

### 22.2 Official Vector Asset Directory (`public/images/tech/`)
- Store official, pristine vector marks in `public/images/tech/`:
  - `angular.svg`: Official Angular gradient shield (`#E03237` to `#F65B2A`).
  - `tailwind.svg`: Official Tailwind CSS cyan wave (`#38BDF8`).
  - `material.svg`: Official Google Material 3 geometric mark (`#7C3AED`).
  - `vitest.svg`: Official Vitest green/yellow beaker mark (`#FCC72B` to `#729B1B`).
  - `netlify.svg`: Official Netlify teal geometric polygon (`#00C7B7`).
  - `typescript.svg`: Official TypeScript blue shield (`#3178C6`).

### 22.3 Official Documentation & Resource Links Mandate
- Whenever showcasing framework, library, or platform capabilities, always accompany the feature card with a direct link to its official documentation:
  - Angular: `https://angular.dev`
  - Tailwind CSS: `https://tailwindcss.com`
  - Angular Material: `https://material.angular.io`
  - Vitest: `https://vitest.dev`
  - Netlify: `https://docs.netlify.com`
  - TypeScript: `https://www.typescriptlang.org`
- Links must use `target="_blank"`, `rel="noopener noreferrer"`, and an explicit `aria-label` (e.g., `aria-label="Angular Official Documentation"`).

### 22.4 Nominative Fair Use Disclaimers (Footer & Stack Catalogues)
- **Legal Compliance**: Third-party trademarks and brand logos are used solely under the doctrine of **Nominative Fair Use** for accurate factual identification of the technical toolchain.
- **Mandatory Disclaimers**:
  1. **Footer Disclaimer**:
     ```html
     <p class="text-[11px] text-stone-500 dark:text-stone-400">
       Angular, Tailwind CSS, Netlify, Vitest, TypeScript, and Google Material Design are trademarks of their respective owners. Their inclusion here is for factual identification under Nominative Fair Use and implies no official endorsement, sponsorship, or affiliation.
     </p>
     ```
  2. **Features Page Disclaimer**:
     Place a noticeable callout badge explaining that all displayed technology marks are property of their respective creators and used strictly to describe compatibility and architecture.

---

## 23. Modular CRUD Architecture & Form Engineering Best Practices

### 23.1 Typed Reactive Forms Architecture (`FormGroup`, `FormControl`)
- All CRUD forms must use Angular's **Strictly Typed Reactive Forms**:
  ```typescript
  export interface TaskFormModel {
    title: FormControl<string>;
    category: FormControl<string>;
    priority: FormControl<'low' | 'medium' | 'high'>;
    description: FormControl<string>;
  }

  readonly taskForm = new FormGroup<TaskFormModel>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    category: new FormControl('Engineering', { nonNullable: true, validators: [Validators.required] }),
    priority: new FormControl('medium', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(2000)] }),
  });
  ```
- **Validation Feedback**: Provide real-time `<mat-error>` feedback with clear error messaging for `required`, `minlength`, and `maxlength`. Never silently disable submit buttons without visible explanation.

### 23.2 Markdown Editor with Live Preview & Sanitized Rendering
- **Dual-Mode Editing**: Provide a tabbed or side-by-side **Write** and **Preview** interface for rich text content.
- **Standalone `MarkdownPipe`**:
  - Transform Markdown syntax (`# Headings`, `**bold**`, `*italic*`, `[links](url)`, ` `code` `, fenced code blocks, and checklist items `- [x]`) into semantic HTML.
  - **Security Mandate**: Always pass generated HTML through Angular's `DomSanitizer.bypassSecurityTrustHtml` after rigorous XSS sanitization (stripping `<script>`, `onerror`, `javascript:` URI handlers).

### 23.3 Mock API Service Pattern (Async Simulation & Local Persistence)
- **Decoupled Mock Layer**: Provide an injectable mock service (e.g. `MockTaskApiService`) that simulates real-world backend API interactions:
  - Asynchronous network latency via RxJS `delay(400)` to trigger loading spinners.
  - Realistic error handling and retry mechanisms.
- **SSR-Safe Browser Storage Persistence**:
  - Fall back to `localStorage` for offline persistence across page reloads.
  - **SSR Guard**: Protect all browser storage calls with Angular's `isPlatformBrowser(this.platformId)` to prevent prerender node crashes:
    ```typescript
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('chintap_tasks_v1', JSON.stringify(tasks));
    }
    ```

### 23.4 Human-Centered, Minimal UI Terminology Rule
- **The Rule**: Keep navigation labels, hero badges, and UI controls simple, human, and minimal.
- **Prohibited**: Technical jargon, developer acronyms, or implementation details in public navigation (e.g., `TASKS CRUD DEMO`, `REACTIVE FORM SHOWCASE`, `MOCK API SUITE`).
- **Standard Lexicon**:
  - In Navbar: `"Tasks"` (clean, universally understood by non-technical audiences).
  - In Hero Badges: `"Project Checklist"` or `"Task Management"`.
  - In Action Buttons: `"New Task"`, `"Save"`, `"Delete"`, `"Cancel"`.

---

## 24. 100% Free-Tier Cloud & Serverless Infrastructure Governance

### 24.1 Zero-Cost Constraint & Free-Tier Boundaries
- **Core Principle**: Chintap starter kits and template implementations must remain **100% Free Tier**. Never introduce dependencies on paid subscriptions, recurring credit-card billing, or costly third-party SaaS services.
- **Netlify Free Tier Quotas**:
  - **Bandwidth**: 100 GB / month (more than sufficient for pre-rendered SSG).
  - **Build Minutes**: 300 minutes / month (efficient Vite/esbuild builds consume < 1.5 min per deploy).
  - **Netlify Forms**: 100 submissions / month.
  - **Netlify Identity**: 1,000 active users / month (free tier auth).

### 24.2 Serverless Auth with Graceful Mock Fallbacks
- When demonstrating authentication (e.g. Netlify Identity), provide an instant **Guest / Demo Mode** switch:
  - Users without a configured Netlify backend or unauthenticated visitors can explore full editing functionality using local state.
  - Clear in-app guidance indicating how to wire up Netlify Identity if desired, without blocking evaluation.

### 24.3 Headless Form Submission & Quota Protection
- Contact forms must submit silently to Netlify's background ingest endpoint (`POST /` with `Content-Type: application/x-www-form-urlencoded`).
- Honeypot fields (`<input name="bot-field" class="hidden">`) must be configured to block spam bots from consuming free-tier form quotas.

---

## 25. Browser Favicon, App Icons & Safe Area Geometry

### 25.1 Vector Viewport Cropping (Eliminating Tab Whitespace)
- **The Defect**: Placing an emblem inside a generic `0 0 1000 1000` SVG viewBox with 40%+ margins causes the browser tab icon to render as an illegible tiny speck.
- **The Solution**: Crop the SVG `viewBox` tightly around the vector bounding box with a 2–4% breathing margin:
  - Example: For an emblem with content spanning $x \in [212, 787]$ and $y \in [50, 950]$, set `viewBox="190 30 620 940"`.
  - Result: The mark fills ~95% of the browser tab area (16x16 / 32x32), delivering maximum visibility without distortion.

### 25.2 Multi-Resolution Transparent `.ico` Architecture
- A compliant `favicon.ico` must be a multi-image binary containing 32-bit RGBA frames:
  - **16 × 16 px**: Standard resolution for dense tab bars and bookmark menus.
  - **32 × 32 px**: High-DPI / Retina browser tabs.
  - **48 × 48 px**: Desktop shortcuts, taskbar pins, and OS search results.
- **Tab Bar Contrast Under-Layer**: Embed a subtle contrast glow or stroke so dark emblems remain clearly legible against dark browser tabs and dark OS themes.

### 25.3 Native Theme-Switching SVG Favicon
- Leverage modern browser SVG favicon theming via inline CSS media queries:
  ```xml
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="190 30 620 940">
    <style>
      .hand { fill: #111111; }
      @media (prefers-color-scheme: dark) {
        .hand { fill: #ffffff; }
      }
    </style>
    <path class="hand" d="..." />
    <path fill="#ea1c24" d="..." />
  </svg>
  ```

### 25.4 Apple Touch Icon & Squircle Safe Margins
- **Dimensions**: $180 \times 180\text{px}$ PNG.
- **Safe Zone Rule**: iOS applies a rounded squircle mask with a corner radius of $40\text{px}$ ($22.2\%$). Scale the emblem to ~80% of canvas height ($144\text{px}$), leaving a minimum $18\text{px}$ ($10\%$) outer margin so details are never clipped by the squircle corners.

---

## 26. Site Constellation & Relational Network Graph Standards

### 26.1 Complete Synchronization with Live Application Routes
- Any interactive graph (such as the "You Are Here" site constellation or page architecture diagrams) must **accurately reflect current site routes and contents**:
  - Every major node must correspond to an active, working route (e.g. `/`, `/features`, `/best-practices`, `/tasks`, `/about`, `/contact`).
  - Child satellite nodes must represent authentic content sections or architectural pillars (e.g., SEO, AEO, LLMO, GEO, SSR).
  - Outdated, legacy, or dead page references (e.g. old client names, defunct services) must never remain in graph schemas.

### 26.2 Active Route Detection & Pulsating Beacon Glow
- The "You Are Here" graph must dynamically detect the user's current route via Angular's `Router`:
  - Map current URL (e.g. `/best-practices`) to the corresponding node ID.
  - Apply active SVG beacon animations (`radialGradient` glow + CSS `@keyframes beacon-pulse`).
  - Render an active `"YOU ARE HERE"` badge in the graph header.

### 26.3 Zero Dead Links Policy in Graph Inspection Cards
- Clicking any node opens an inspection panel or floating detail bar.
- Every actionable route link (`info.route`) MUST point to a valid internal route. Never emit links to 404 or unrouted paths.

### 26.4 Symmetrical Elliptical Orbital Geometry (Desktop vs. Mobile)
- Distribute nodes symmetrically on an orbital ellipse centered at $(c_x, c_y)$:
  - Position: $\left(c_x + r_x \cos\theta, \; c_y + r_y \sin\theta\right)$.
  - Outer desktop radii: $r_x = 300, r_y = 200$.
  - Scaled mobile radii: $r_x = 240, r_y = 160$ (or $80\%$ edge reduction towards center).
  - Child satellite expansion offsets must radiate outward away from the orbital center to prevent text collisions.

---

## 27. Semantic Versioning (SemVer 2.0.0) & Release Protocol

### 27.1 SemVer Progression Rules (`MAJOR.MINOR.PATCH`)
- **`MAJOR`**: Incompatible architectural changes, framework migrations, breaking route changes, or major redesigns.
- **`MINOR`**: Backward-compatible new features or modules (e.g. adding the `/tasks` CRUD module, new service pipelines, new UI components).
- **`PATCH`**: Backward-compatible bug fixes, UI/UX polish, asset optimizations, content synchronizations, and documentation improvements (e.g., favicon cropping, graph content alignment).

### 27.2 Atomic Multi-File Version Synchronization Checklist
Whenever incrementing the version, update all five touchpoints atomically:
1. `package.json`: `"version": "X.Y.Z"`
2. `src/app/core/config/site.config.ts`: `version: 'X.Y.Z'`
3. `README.md`: Version badge `[![Version](https://img.shields.io/badge/version-X.Y.Z-10b981.svg?style=flat)](CHANGELOG.md)`
4. `CHANGELOG.md`: New entry `## [X.Y.Z] - YYYY-MM-DD` following [Keep a Changelog](https://keepachangelog.com/) standards.
5. Footer Component / Display: Automatically picks up `siteConfig.version` or `package.json` version.

### 27.3 Git Tagging & Release Verification Workflow
1. Run full test suite: `npm test -- --watch=false` (100% passing tests required).
2. Run production SSG build: `npm run build` (all static routes must prerender without error).
3. Commit changes with conventional commit prefix (`fix:`, `feat:`, `chore:`).
4. Create annotated Git tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z: Summary"`
5. Push commit and tag to remote: `git push origin main && git push origin vX.Y.Z`

---

## 28. Official Organization Repository Migration Protocol

When moving this starter kit to its permanent organizational home (e.g. `chintap-india/angular-starter`), preserve complete repository integrity:

### 28.1 Retaining Full Git History & Tags
Never re-initialize (`git init`) an existing production codebase or wipe git history. Instead, update the remote URL or push to the new remote:
```bash
# Update existing origin
git remote set-url origin https://github.com/chintap-india/angular-starter.git
git push -u origin main
git push origin --tags
```

### 28.2 Atomic Codebase Reference Updates
When changing the canonical GitHub repository:
1. `package.json`: Update repository URL field.
2. `src/app/core/config/site.config.ts`: Update `social.github`.
3. `src/app/core/config/site.content.ts`: Update CLI quickstart `git clone` snippet.
4. `README.md`: Update clone URLs, badge links, and contribution links.
5. `CONTRIBUTING.md`: Update fork and upstream clone instructions.

---

## 29. Enterprise Data Table & List Architecture: The `chintap-compact-template`

The `chintap-compact-template` is the official enterprise standard for tabular and list-based data management in Chintap applications. It optimizes for maximum vertical screen estate, dense data inspection, and zero-scroll viewing.

### 29.1 Two-Tier Navigation Toolbar
- **Tier 1 (Context & Primary Actions)**:
  - Left: Brand icon badge, module title, live count badge, and inline quick search with instant clear.
  - Right: View mode toggle (`table`, `cards`, `metrics`), utilities (`Seed`, `Reset`, `Auth Mode`), and primary pill CTA (`+ New Task`).
- **Tier 2 (Filters & Sub-Navbar)**:
  - Left: Segmented status filter pills (`All`, `To Do`, `In Progress`, `Completed`), priority filter dropdown, and clear filter button.
  - Right: Tucked pagination navigation controls and overall sprint completion badge.
- **Alignment Mandate**: Both tiers must maintain strict left-and-right justification without awkward wrapping voids.

### 29.2 Tucked Top-Bar Pagination (Zero Bottom Paginator)
- Never place bulky `<mat-paginator>` footers at the base of tables; they consume ~64px of vertical height and force users to scroll down to navigate pages.
- Move all pagination controls into the Tier 2 sub-navbar:
  - **Rows-Per-Page Selector**: Compact pill dropdown (`10 / page ▾`, `25`, `50`, `100`).
  - **Step Controller**: First (`|<`), Previous (`<`), live range (`Showing 1–10 of 45`), Next (`>`), and Last (`>|`).
  - Disable boundary buttons dynamically (`hasPrevPage`, `hasNextPage`).
- Reclaims ~64px of vertical viewport, allowing all 10 table rows to render without scrolling on standard laptop displays.

### 29.3 Row Focus Depth & Peripheral Dimming
- When hovering or keyboard-focusing (`:focus-within`) any table row:
  - The active row remains 100% sharp with an elevated background and left accent bar.
  - All non-hovered sibling rows softly dim (`opacity: 0.35`, `filter: blur(0.65px)`).
- Keeps user attention sharply locked on the active row during multi-column data reviews.

### 29.4 Dual Layout Switching (`table` vs. `cards`)
- Provide instant switching between sortable enterprise data tables (`MatTable`, `MatSort`) and rich Markdown preview cards without page reload.
- Both layouts share the identical top-bar filter state and tucked pagination.

### 29.5 Sprint Metrics & Dashboard Standards
- No marketing filler cards or promotional bullet strips in functional analytics dashboards.
- Clean KPI cards with subtle top-right indicator icons, bold numbers, and contextual percentage breakdowns.
- Multi-segment priority severity distribution bar (Urgent rose, High amber, Medium blue, Low stone).
- Dynamic category workload breakdown bars.
- Critical Attention Queue: Actionable table of pending urgent/high priority tasks with deep links (`/tasks/:id`).

### 29.6 Strict Styling, Button Shapes & Emoji Rules
- **Strictly No Emojis**: 100% clean typography and Angular Material icons (`mat-icon`).
- **Pill-Shaped Buttons**: All buttons containing text must use `rounded-full` / `!rounded-full`.
- **Sequential Numeric IDs**: Format task IDs as clean numeric strings (`#1`, `#2`, `#35`) via `formatTaskId()`.

### 29.7 Mobile & Responsive Table Standards (Zero Horizontal Scroll)
- **The Zero-Scroll Mobile Rule**: An enterprise data table must never require horizontal panning on smartphone viewports (`360px – 414px`). Horizontal scrolling hides >50% of the dataset off-screen and degrades mobile triage.
- **Progressive Column Tucking**:
  - Keep 3 core columns on mobile screens (`< 640px`):
    1. **Selection Column** (`!w-10 text-center`): Compact checkbox for instant status/batch operations.
    2. **Primary Entity Column** (`!w-auto flex-1`): Full task title on line 1, with an inline micro-metadata sub-row on line 2 (`md:hidden`):
       `#35 • Category • Priority • Status • Due Date`
       This tucks all secondary metadata directly beneath the title with zero vertical bloat.
    3. **Action Column** (`!w-12 text-right`): Single `⋮` Kebab button (`more_vert`) triggering an Angular Material `<mat-menu>`.
  - Secondary columns gracefully hide at tailored breakpoints using `!important` utility classes:
    - `.col-hidden-sm`: Hidden on mobile `< 640px` (`id`, `status`).
    - `.col-hidden-md`: Hidden on mobile/small-tablet `< 768px` (`priority`).
    - `.col-hidden-lg`: Hidden on tablet `< 1024px` (`category`).
    - `.col-hidden-xl`: Hidden on laptop `< 1280px` (`dueDate`).
- **Lazy Menu Memory Optimization**:
  - Always implement row-level action menus using `<ng-template matMenuContent let-task="task">` with `[matMenuTriggerData]="{ task: task }"`. This instantiates a single shared `<mat-menu>` in the DOM rather than duplicating menu elements across every table row.
- **Tier 1 Mobile Toolbar Collapse**:
  - Search input dynamically flexes down on small screens (`min-w-[80px]`).
  - Secondary utilities (`Seed`, `Reset`, `Auth Mode`) collapse into a single mobile overflow menu button (`sm:hidden`).
  - Primary CTA renders icon-only (`+`) on mobile and full pill label (`+ New Task`) on `sm:`.
- **Touch-Target Compliance**:
  - Every row maintains a minimum height of `44px` to satisfy Apple Human Interface Guidelines and WCAG 2.2 AA pointer cancellation without ballooning whitespace.

### 29.8 Mobile Modal & Full-Screen Editor Standards (Focus / Zen Mode)
- **Zero Label Clutter Rule**: On mobile screens (`< 640px`), avoid static uppercase labels (`TASK TITLE *`, `SPECIFICATIONS`, etc.) that consume >40% of vertical screen height. Use descriptive input placeholders (`"Task title..."`, `"Write specifications, # headings, \`code\`..."`) and inline error helpers.
- **Single-Row Compact Property Pill Strip**:
  - Tucks Category, Priority, Status, and Due Date into an ultra-compact horizontal scrollable pill bar (`~28px` height).
  - Eliminates bulky stacked `<mat-form-field>` boxes and multi-line chips on mobile.
- **Focus Mode / Full-Screen Editor Alone**:
  - Provides a dedicated **Focus Editor (Zen Mode)** toggle button.
  - When enabled:
    - Hides the properties strip and extra header text.
    - Dedicates >85% of the viewport height strictly to the Markdown textarea / live preview.
    - Maximizes typing canvas when the mobile on-screen virtual keyboard is active.
- **Native Full-Screen Edge-to-Edge Dialog Styling**:
  - Mobile viewports (`< 640px`) automatically expand dialog containers to `100vw × 100dvh` with `border-radius: 0`, eliminating awkward outer margins and inner double scrollbars.

### 29.9 PWA & Mobile App Installation Identity
- **Separation of Production vs. Starter Kit Namespaces**:
  - The standalone brand name `"Chintap"` is strictly reserved for the primary corporate website (`chintap.com`).
  - The Angular starter template must be identified as `"chintap-starter-kit-angular"` in both `name` and `short_name` across `public/site.webmanifest` and mobile meta tags (`apple-mobile-web-app-title`, `application-name`).
  - This ensures when developers or users install the template as a Progressive Web App (PWA) or add it to an Android/iOS home screen, the installed app icon and launcher title appear distinctly as `chintap-starter-kit-angular` without colliding with or confusing the primary brand app.
- **PWA Manifest Configuration**:
  - Explicitly define `"id": "/?source=pwa"` and `"scope": "/"` in `site.webmanifest` for distinct browser app sandboxing.
  - Maintain redirects from `/manifest.json` and `/manifest.webmanifest` to `/site.webmanifest`.

### 29.10 Dark Mode Slate Architecture & WCAG AA/AAA Contrast Standards
- **Refined Slate Palette Over Pitch Black or Muddy Stone**:
  - Avoid harsh pure jet black (`#000000`) which produces high glare and eye fatigue on OLED displays.
  - Avoid muddy, warm brown-stone (`stone-900`, `stone-950`) which feels dated and dirty.
  - Standardize on an aesthetic, modern **Slate color theme**:
    - **App Canvas Surface**: Slate-950 (`#020617` / `dark:bg-slate-950`).
    - **Dialogs & Base Cards**: Slate-900 (`#0f172a` / `dark:bg-slate-900`).
    - **Table Header & Elevated Panels**: Slate-800 (`#1e293b` / `dark:bg-slate-800/90`).
    - **Subtle Borders & Row Dividers**: Slate-700 (`#334155` / `dark:border-slate-700/80`).
    - **Secondary & Tertiary Text**: Slate-300 (`#cbd5e1` / `dark:text-slate-300`) and Slate-400 (`#94a3b8` / `dark:text-slate-400`).
- **WCAG 2.2 AA and AAA Contrast Compliance for Badges & Labels**:
  - All status pills, priority badges, category chips, and table metadata must meet or exceed WCAG 2.2 AA minimum contrast (>= 4.5:1) and target AAA (>= 7:1) against dark slate surfaces.
  - Never use muddy mid-tones like `dark:text-stone-500` or washed-out `text-amber-400`/`text-rose-400` that fail contrast audits.
  - Approved High-Contrast Badges on Dark Slate:
    - **Urgent**: `bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/80` (10.8:1 contrast).
    - **High**: `bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80` (11.2:1 contrast).
    - **Medium**: `bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800/80` (10.5:1 contrast).
    - **Low / To Do**: `bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700` (10.5:1 contrast).
    - **Completed**: `bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80` (12.4:1 contrast).
- **Peripheral Table Row Dimming Contrast Safety Rule**:
  - When applying focus-directing dimming across sibling table rows during hover or keyboard navigation:
    - Light mode can softly dim siblings to `0.50` opacity with `filter: blur(0.4px)`.
    - **Dark mode must NEVER drop below 0.70 opacity** (`opacity: 0.70 !important`) and **must NEVER apply blur** (`filter: none !important`).
    - Lower opacities (e.g. `0.35`) in dark mode crush text contrast from 7:1 down to < 2.5:1, causing immediate WCAG accessibility violations.
    - Active hovered/focused rows stay 100% crisp with `background-color: rgba(30, 41, 59, 0.98)` and a distinctive sky-blue accent left indicator (`box-shadow: inset 3.5px 0 0 0 #38bdf8 !important`).

### 29.11 Mobile View Menu Collapsing & Zero-Overlap MDC Menu Standards
- **Zero-Overlap MDC Menu Architecture**:
  - Global button centering rules (`button:has(mat-icon)`) must explicitly exclude menu items:
    `button:not(.mat-mdc-menu-item):has(mat-icon), a:not(.mat-mdc-menu-item):has(mat-icon)`.
    Without this exclusion, MDC menu buttons center their text and icons, collapsing flex layouts and causing subpixel rendering overlaps on high-DPI and mobile devices.
  - Every `<mat-icon>` rendered inside a `<button mat-menu-item>` or `<a mat-menu-item>` must include the Angular Material `matMenuItemIcon` directive.
  - Dedicated menu layout rules must guarantee minimum panel widths (`min-width: 220px !important`), left alignment (`display: flex !important; justify-content: flex-start !important;`), explicit icon margins (`margin-right: 0.75rem !important; margin-left: 0 !important; flex-shrink: 0 !important;`), and full flex-grow on `.mat-mdc-menu-item-text` (`text-align: left !important`).
  - Menus must adhere to the high-contrast Slate theme (`background-color: #0f172a`, `border: 1px solid #334155`, text `#f1f5f9`, hover state `#1e293b`).
- **Tier 1 Mobile Viewport Collapsing (< 640px)**:
  - Multi-button view switchers (Table, Cards, Sprint Analytics) must be hidden on mobile screens (`hidden sm:inline-flex`) and collapsed into the mobile overflow menu (`mobileUtilMenu`).
  - This preserves vital horizontal real estate in Tier 1, allowing the quick search input to maintain full usability without being squished.
  - In `mobileUtilMenu`, a dedicated "View Mode" section (`sm:hidden`) lets users toggle between Table View, Cards View, and Sprint Analytics with clear active status indicators.
- **Tier 2 Compact Mobile Pagination**:
  - The rows-per-page selector pill (`10/page`) must be hidden on mobile screens (`hidden sm:inline-flex`), preserving only the compact pagination stepper `‹ 1–10 of 35 ›` to prevent multi-row wrapping.
- **Table and Card Row Action Collapsing (< 768px)**:
  - On viewports `< 768px` (`md:hidden`), table rows must collapse the 4 expanded action buttons (`open_in_new`, `visibility`, `edit`, `delete`) into a single kebab trigger (`more_vert`) powered by a shared, lazy-loaded `#rowActionMenu`.
  - Cards view must similarly collapse actions into `more_vert` on mobile screens (`< 640px` / `sm:hidden`), preventing action button strips from crowding card headers and category badges.
  - The shared `#rowActionMenu` must be declared outside of any scoped `@if` control flow blocks so it is globally available to both table and card views.





