# Project Tasks (CRUD & Forms Demo) Page Content

- **Route:** `/tasks`
- **Page Title:** `Project Tasks | Enterprise CRUD Demo — Chintap Angular Starter`
- **Meta Description:** `Interactive Angular 22 CRUD demo demonstrating Typed Reactive Forms, Markdown preview, mock API latency simulation, and SSR-safe LocalStorage persistence.`
- **Component:** `src/app/pages/tasks/tasks-page.component.ts`

---

## Overview

The Tasks page is an enterprise form engineering demo highlighting real-world Angular patterns without requiring any external paid backend or database.

---

## Key Capabilities

### 1. Typed Reactive Forms
- Strongly typed `FormGroup` with `FormControl<string>` and `FormControl<TaskPriority>`.
- Granular synchronous validation with inline error feedback (`required`, `minlength`, `maxlength`).
- Dirty/touched state preservation and accessible error announcements.

### 2. Dual-Mode Markdown Editor & Preview
- Custom write/preview toggle allowing users to author task descriptions with Markdown.
- Rendered via sanitized `MarkdownPipe` with XSS injection protection.
- Support for bold, italic, code blocks, lists, blockquotes, and links.

### 3. Asynchronous Latency Simulation
- `MockTaskApiService` simulates real-world network latency (300ms–800ms) with `Observable` and RxJS operators.
- Granular loading state indicators on buttons and task cards.

### 4. SSR-Safe Local Storage Persistence
- Automatic fallback: In SSR/SSG server environments, initial state is seeded safely.
- In browser runtime, tasks persist across sessions using `localStorage`.

### 5. Role-Based Auth Simulation (Local-First & Free-Tier Friendly)
- Built-in Netlify Identity integration ready out-of-the-box.
- Instant toggle between **Guest** (read-only) and **Lead Developer** (full CRUD) roles for rapid UI evaluation.
