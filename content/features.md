# Features & Architecture Page Content

- **Route:** `/features`
- **Page Title:** `Features & Architecture | Chintap Angular Starter`
- **Meta Description:** `Explore the modern architecture of the Chintap Angular Starter Kit — Angular 22 Signals, Tailwind CSS 4, Vitest, Material Design 3, and SSG performance.`
- **Component:** `src/app/pages/features/features-page.component.ts`

---

## Overview

The Features & Architecture page breaks down the core technical foundation of the starter kit, demonstrating why each tool was chosen and how they integrate seamlessly.

---

## Core Architecture Highlights

### 1. Angular 22 & Signals
- Standalone components by default with zoneless change detection.
- Fine-grained reactive state management with `signal()`, `computed()`, and `effect()`.
- Modern control flow syntax (`@if`, `@for`, `@let`, `@switch`).
- Inject-based dependency injection (`inject()`) eliminating bloated constructor boilerplate.

### 2. Tailwind CSS 4 & Material Design 3
- Native CSS-first engine using `@import "tailwindcss";` and `@variant dark`.
- Accessible, theme-aware Angular Material 3 components (`MatExpansionModule`, `MatButtonModule`, `MatIconModule`, `MatDialogModule`, `MatSnackBarModule`).
- Dark mode reactive signal switching with instant `localStorage` persistence and zero flash of unstyled content.

### 3. Vitest Unit Testing Engine
- Blazing-fast test runner replacing Karma/Jasmine with native ESM support.
- 102 comprehensive unit tests across 15 suites covering components, pipes, services, and route guards.
- Mocking and DOM simulation using JSDOM.

### 4. Netlify Edge & Static Site Generation (SSG)
- Application Builder (`@angular/build:application`) statically pre-rendering all routes (`src/routes.txt`).
- Edge headers pre-configured in `netlify.toml` for Content Security Policy (CSP), HSTS, and MIME types.
- Client-side hydration with event replay (`provideClientHydration(withEventReplay())`).

---

## Official Tech Stack Matrix

| Technology | Role | Version | License |
|---|---|---|---|
| **Angular** | Core Web Framework | `^22.2.2` | MIT |
| **TypeScript** | Type-Safe Language | `^5.8.0` | Apache-2.0 |
| **Tailwind CSS** | Utility-First Styling | `^4.0.0` | MIT |
| **Material 3** | Component UI Library | `^22.2.2` | MIT |
| **Vitest** | Unit Test Runner | `^2.1.0` | MIT |
| **Netlify** | Edge Hosting & Forms | Free Tier | Commercial Free Tier |
