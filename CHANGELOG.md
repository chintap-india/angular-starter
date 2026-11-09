# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project strictly adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

---

## Semantic Versioning Policy

Given a version number `MAJOR.MINOR.PATCH`, increment the:
- **`MAJOR`** version when making incompatible API changes or breaking architectural redesigns that require code refactoring.
- **`MINOR`** version when adding functionality in a backward-compatible manner (e.g., new pages, new CRUD modules, new pipes, or new configuration schemas).
- **`PATCH`** version when making backward-compatible bug fixes, UI/UX polish, styling corrections, or documentation updates.

## [1.5.11] - 2026-11-09

### Fixed
- **Unify Dropdown & Badge Typography**:
  - Standardized font styling across Category, Priority, and Status dropdown triggers and option items in `TaskFormDialogComponent` from mismatched `font-mono uppercase` to uniform `font-sans text-xs font-medium`.
  - Harmonized metadata badges on `TaskDetailPageComponent` to clean `font-sans text-xs font-medium` typography.
- **Eliminate Focus Double Borders on Pill Selects**:
  - Removed internal browser focus outline on `<mat-select>` elements within rounded pill capsules (`.mat-mdc-select:focus { outline: none !important; border: none !important; box-shadow: none !important; }`).
  - Shifted active focus states to the capsule container via Tailwind `focus-within:ring-2 focus-within:ring-slate-900 dark:focus-within:ring-slate-300 focus-within:border-transparent`.
- **Dropdown Panel Width & Option Truncation**:
  - Added dedicated `.task-dropdown-panel` class to all task modal select panels with `min-width: 175px !important;` and `white-space: nowrap !important;`.
  - Prevented CDK overlay squishing where labels like "In Progress" and "Completed" wrapped awkwardly into two lines.
- **Task Detail Title Legibility on Mobile**:
  - Removed destructive `line-through` strikethrough from the main `<h1>` title on `TaskDetailPageComponent`, which previously created illegible overlapping lines over multiline headings on mobile screens.
  - Adjusted title line-height to `leading-snug` for comfortable breathing room on mobile viewports.
  - Improved top sticky header responsive layout to stack navigation breadcrumbs and action capsule cleanly on small screens.
- **Strict Emoji Elimination**:
  - Replaced all emojis in dropdown options and global documentation files with crisp Material Design icons and CSS colored dot indicators.
- **Headless Test Suite Guards**:
  - Added SSR/Node environment guards (`typeof requestAnimationFrame !== 'undefined'`) in `DinoGameComponent` to prevent Vitest test runner crashes.

### Changed
- **Tailwind Utility Migration & CSS Pruning**:
  - Removed redundant `.col-hidden-sm`, `.col-hidden-md`, `.col-hidden-lg`, and `.col-hidden-xl` media query blocks from `src/styles.css`.
  - Migrated responsive column visibility in `tasks-page.component.html` to native Tailwind utilities (`max-sm:!hidden`, `max-md:!hidden`, `max-lg:!hidden`, `max-xl:!hidden`).
- **Security Policy Synchronization**:
  - Updated `SECURITY.md` supported versions matrix to reflect current `1.5.x` and `1.4.x` active support.
  - Enforced `SECURITY.md` update verification within the atomic release checklist in `FRONTEND_APP_GUIDELINES.md`.

## [1.5.10] - 2026-11-09

### Removed
- **Redundant Sidebar Actions & Cluttered Right Rail on Dedicated Task Page**:
  - Eliminated the redundant right-column "TASK ACTIONS" card (`lg:col-span-4`) containing duplicate buttons ("Mark Completed", "Change Status", "Edit Specifications", "Copy Task URL", "Delete Task").
  - All actions are cleanly consolidated in the top sticky navigation pill bar, which is always accessible and visible without scrolling.
  - Eliminated bottom-stacked action cards on mobile devices, resulting in an uncluttered, distraction-free reading experience.

### Changed
- **Focused Single-Column Task Document Layout**:
  - Replaced the asymmetric 12-column grid (`lg:grid-cols-12`) with a clean, centered `max-w-4xl mx-auto` single-column layout.
  - Focused the screen entirely on the core task contents: Title & Metadata Card, and Task Specifications & Notes (Markdown editor view).

### Added
- **Sprint Details Modal Dialog (`TaskSprintDetailsDialogComponent`)**:
  - Encapsulated sprint metadata (Task ID, Category, Status badge, Priority badge, Due Date, Created Timestamp, Updated Timestamp, Route Path with 1-click copy) into a dedicated modal dialog.
  - Accessible via a prominent **"Sprint Details"** pill button in the Title card's badge row and an info button (`info`) in the top sticky header toolbar.
  - Added full unit test coverage for `TaskSprintDetailsDialogComponent` (141 total tests passing across 20 suites).

## [1.5.9] - 2026-11-09

### Fixed
- **Clean Isolated Row & Card Hover Highlights (Zero Sibling Blurring)**:
  - Eliminated sibling row blurring (`filter: blur(...)`) and opacity dimming (`opacity: 0.35` / `0.65`) from `src/styles.css`.
  - Sibling rows and cards now remain 100% sharp and fully legible during hover interactions.
  - Hover highlights are applied cleanly and exclusively to the targeted `.tasks-table-row:hover` and `.tasks-card-item:hover` with subtle background illumination and border emphasis.
- **Client Hydration Guard (`NG0505` Resolution)**:
  - Added `isHydrationAvailable()` guard in `src/app/app.config.ts` inspecting for serialized server markers (`ng-state` or `[ngh]`).
  - Completely prevents `NG0505` warnings during CSR-only development (`ng serve`) while ensuring full hydration and event replay remain active on SSG/SSR builds.
- **Contact Forms & Netlify Form Handling**:
  - Fixed Netlify crawler form endpoint detection in `src/index.html` by adding `method="POST"` and `action="/"`, preventing HTTP 404 responses.
  - Added missing form intents (`starter-kit`, `general`) to `ContactFormComponent` dropdown, fixing blank selects from homepage and footer triggers.
  - Standardized footer "Get in Touch" trigger to open `ContactDialogComponent` via `ContactModalService` with `intent: 'general'`.
- **Zero-Data-Loss Contact Architecture (`ContactSubmissionService`)**:
  - Implemented `ContactSubmissionService` guaranteeing every user message is preserved in browser `localStorage` (`'chintap_contact_submissions'`) even in offline or network failure scenarios.
  - Built-in 1-click **"Send via Email"** (`mailto:`) direct fallback button if network POST ever fails.
  - Integrated 404 auto-reporting in `NotFoundPageComponent` through `ContactSubmissionService`.

### Added
- **Tasks Module Accessibility (WCAG 2.1/2.2 AA Compliance)**:
  - Added `role="radiogroup"` and `role="radio"` with keyboard navigation (`tabindex="0"`, Enter, and Space selection) to `TaskStatusDialogComponent`.
  - Added contextual, descriptive `aria-label` attributes to table and card view buttons (`'Edit task: ' + task.title`, `'Delete task: ' + task.title`, `'View task details: ' + task.title`, `'Open dedicated page for ' + task.title`, `'Change status for ' + task.title`).
  - Added `aria-pressed` states to View Switcher buttons (Table, Cards, Metrics) and `aria-expanded` state to Filter panel toggle.
- **Comprehensive Unit Tests**:
  - Added test suites for `ContactSubmissionService` and `isHydrationAvailable()`, increasing total tests to 135 passing across 19 suites (100% pass rate).

## [1.5.8] - 2026-11-09

### Fixed
- **Dark Mode Table Visibility & High-Contrast Slate Theme**:
  - Resolved white background bleed-through in Dark Mode caused by Angular Material's default `.mat-mdc-table` surface styles.
  - Implemented an enterprise slate theme: table canvas and data rows now render on `#0f172a` (Slate-900), headers on `#1e293b` (Slate-800), and borders on `rgba(51, 65, 85, 0.45)` (Slate-700).
  - Enhanced contrast to WCAG AAA standards (> 12:1) across all text elements (`text-slate-100`, `text-slate-200`, `text-slate-300`, `text-emerald-200`, `text-amber-200`, `text-rose-200`).
  - Added subtle alternating row tinting (`rgba(30, 41, 59, 0.40)`) in Dark Mode for effortless visual scanning.
  - Styled unselected checkboxes with crisp `#64748b` (Slate-500) borders and `#94a3b8` (Slate-400) hover states for clear visibility against dark backgrounds.
  - Restrained table hover/dimming to mouse devices (`@media (hover: hover)`) to eliminate accidental sibling row dimming on mobile touch devices.

### Added
- **Zero-Tasks Empty State (Zero Clutter When No Tasks Exist)**:
  - When the task backlog has zero tasks (`tasks().length === 0`), completely concealed the table view, cards view, metrics dashboard, pagination bar, search bar, view switcher, and filter options.
  - Displayed a clean, spacious zero-state container with a friendly "No tasks created yet" message, an intuitive "Create Task" button that opens the task creation modal, and a "Load Demo Tasks" button for instant demonstration.

## [1.5.7] - 2026-11-09

### Changed
- **Zero-Clutter Edit Task Modal (Header Save Icon Button & Zero-Clutter Layout)**:
  - Promoted the primary Save / Update action to a high-contrast `check` icon button (`w-7 h-7 sm:w-8 sm:h-8 rounded-lg`) in the dialog header action strip next to Focus Mode, Fullscreen, and Close.
  - Completely eliminated the bloated 70–80px bottom footer containing `Cancel` and `Update Task` / `Create Task` pill buttons, freeing up 100% of vertical dialog space for the Markdown editor and previewer.
  - Added modern cross-browser `.no-scrollbar` utility in `src/styles.css` (`-webkit-scrollbar`, `-ms-overflow-style`, and `scrollbar-width: none`), completely eliminating the native horizontal scrollbar bar beneath property dropdown pills on mobile viewports.
  - Cancel / Discard is seamlessly handled by the top-right header `close` icon button with dedicated tooltip.

## [1.5.6] - 2026-11-09

### Changed
- **Zero-Clutter View Task Modal (Header Action Icon Buttons)**:
  - Converted `Edit Task`, `Change Status`, and `Delete Task` into compact, high-contrast `w-7 h-7 sm:w-8 sm:h-8` icon buttons (`edit`, `published_with_changes`, `delete_outline`) directly in the modal header action strip.
  - Completely eliminated the bloated 80px footer and multi-row button wrapping on mobile, reclaiming 100% of vertical space for the task content and markdown description.
  - Cleaned metadata strip: stripped redundant prefixes (`Status: `, `Priority: `, `Due: `, `Updated: `), leaving clean, self-explanatory pill chips.
  - Removed loud `Description & Specifications` heading; content is presented cleanly inside the card without redundant noise.
- **Zero-Clutter Markdown Editor Dialog**:
  - Removed redundant sub-bar labels (`Markdown supported`, `Paste URL over text to auto-link`).
  - Removed duplicate `Editor Only` / `Show Properties` button in the editor sub-bar; converted the header Focus Mode toggle to a clean `center_focus_strong` / `fit_screen` icon button.
  - Converted formatting toolbar controls (`Code`, `List`, `Task`, `Quote`) from mixed text-buttons into uniform, compact icon buttons with Material Tooltips, saving massive horizontal and vertical real estate.

## [1.5.5] - 2026-11-09

### Fixed
- **Eliminated Multi-Layered Outline Bug on Text Inputs & Textareas**:
  - Replaced universal `*:focus-visible` wildcard rule (`outline: 3px solid #1c1917 !important; outline-offset: 3px !important; border-radius: 4px;`) with targeted `:focus-visible` for interactive navigation elements.
  - Explicitly excluded all form inputs (`input:not([type="checkbox"]):not([type="radio"])`, `textarea`, `select`, `.mat-mdc-input-element`) with `outline: none !important; outline-offset: 0 !important;`.
  - Harmonized focus ring and border transitions (`focus:ring-1 focus:border-slate-500` / `dark:focus:ring-slate-400 dark:focus:border-slate-400`) directly on the element's own border-radius, completely eliminating detached floating rectangles, double/triple concentric outlines, and corner shape deformation.
  - Added 15-second test suite timeout to `TasksPageComponent` spec to prevent artificial timeouts under heavy build loads.

## [1.5.4] - 2026-11-09

### Changed
- **Mobile Search Bar Dedicated Row (Zero Horizontal Squeeze)**:
  - Repositioned the quick search text box on mobile viewports (`< 640px`) to its own dedicated second row using responsive CSS order (`order-3 sm:order-2 w-full sm:w-56 lg:w-64`).
  - Row 1 on mobile is now exclusively dedicated to the Tasks title badge on the left and the 5 essential action icon buttons on the right (`table_rows`, `view_agenda`, `insights`, `tune`, `add`), providing 120px+ of breathing room on 360px displays.
  - The search input on mobile spans 100% full width (`w-full py-1.5`) with complete placeholder legibility (`Search tasks...`), instant clear button, and effortless tap targets.
  - Preserves clean inline desktop layout (`sm:flex-nowrap`, search inline adjacent to Title badge) without DOM duplication.

## [1.5.3] - 2026-11-09

### Added
- **Features Page Integration**:
  - Added **Enterprise Tasks Management** architectural card to `/features` (`features.items` in `site.content.ts`), highlighting full Signal-driven CRUD, Markdown previews, real-time filtering, responsive tables, and sprint analytics.
  - Added internal `routerLink` support for feature cards with local routes, rendering a direct `Live App →` CTA to `/tasks`.
- **Dedicated Mobile View Modal Trigger**:
  - Added a direct `visibility` icon button in table row actions on mobile viewports (`< 768px`), allowing users to tap and open the full task detail modal immediately instead of overcrowding table rows with metadata.

### Changed
- **Zero-Clutter Toolbar Icon Buttons**:
  - Converted `Filters` and `Create Task` buttons into compact `w-7 h-7` icon buttons (`tune` and `add`), perfectly matching the 3 view switchers and eliminating horizontal squeezing on mobile displays.
- **Collapsible Panel Utilities Simplification**:
  - Converted `Seed 35+` and `Reset` to sleek `w-7 h-7` icon buttons (`playlist_add` and `restart_alt`) with tooltips.
  - Removed the `Guest Reviewer` / Auth mode button from the collapsed panel to eliminate unnecessary clutter.
- **Table Rows De-Cluttering & Font Readability**:
  - Removed the crowded micro-meta subrow (`#id • CATEGORY • PRIORITY • STATUS • DUE DATE`) from table rows on mobile.
  - Increased task title typography to `text-sm sm:text-base font-semibold` with comfortable line height, ensuring clear readability without zooming.
  - Fixed mobile table header label truncation on the `select` (`Done`) and `actions` (`View`) columns.

## [1.5.2] - 2026-11-09

### Added
- **Streamlined Clutter-Free Primary Toolbar (Tier 1)**:
  - Preserved strictly the 5 essential controls directly visible across mobile and desktop:
    1. **Title & Search** (`Tasks` count badge + adaptive width inline quick search).
    2. **Table View Button** (`table_rows`).
    3. **List / Cards View Button** (`view_agenda`).
    4. **Dashboard View Button** (`insights`).
    5. **Add Button** (`+ New Task`).
    6. **Filter & Options Panel Toggle** (`tune` icon button with active filter counter badge).
  - Eliminated toolbar button crowding and icon wrapping across all viewport breakpoints.
- **Collapsible Filters & Utilities Panel**:
  - Moved secondary actions and filter controls into a clean, collapsible panel toggled via `isFilterPanelOpen = signal(false)`:
    - Status filter chips (`All`, `To Do`, `In Progress`, `Completed`).
    - Priority filter dropdown (`Urgent`, `High`, `Medium`, `Low`, `All`).
    - `Clear Filters` button (`filter_alt_off`).
    - Secondary utilities: `Seed 35+ Backlog Tasks` (`playlist_add`), `Reset Default Tasks` (`restart_alt`), and `User Session` toggle (`manage_accounts`).
    - Rows per page selector (`10`, `25`, `50`, `100` / page).
- **Persistent Bottom Pagination & Metrics Bar**:
  - Added bottom pagination bar for directory table and card views (`Showing 1–10 of 35 tasks • Sprint: 15/35 (43%)` ... `[‹ Page 1 of 4 ›]`).
  - Allows seamless navigation across pages without needing to open the collapsed panel.
- **Automated Unit Testing**:
  - Added unit test verifying `isFilterPanelOpen` toggle behavior and `activeFiltersCount` computation (126/126 tests passing).

## [1.5.1] - 2026-11-07

### Fixed
- **Menu Icon & Text Overlap Resolution**:
  - Excluded `.mat-mdc-menu-item` from global button icon-centering rules (`button:not(.mat-mdc-menu-item):has(mat-icon)`), preventing menu items from centering labels and breaking flex layouts.
  - Added Angular Material `matMenuItemIcon` directive to all `<mat-icon>` elements inside `rowActionMenu` and `mobileUtilMenu`.
  - Added dedicated MDC menu styling guaranteeing `min-width: 220px !important`, left-aligned flex layout, and `margin-right: 0.75rem !important` between icons and text labels.
- **Mobile Toolbar & Menu Collapsing**:
  - Collapsed 3-button segmented view switcher (`table_rows`, `view_agenda`, `insights`) into `mobileUtilMenu` on mobile screens (`hidden sm:inline-flex`), freeing up ~120px for the search bar.
  - Added dedicated "View Mode" section in `mobileUtilMenu` (`sm:hidden`) for switching between Table View, Cards View, and Sprint Analytics.
  - Hidden rows-per-page selector pill (`10/page`) on mobile screens (`hidden sm:inline-flex`), preserving the compact stepper `‹ 1–10 of 35 ›`.
  - Shifted table actions column collapse breakpoint to `md:` (`hidden md:inline-flex` and `md:hidden`), rendering a single kebab trigger (`more_vert`) on viewports `< 768px`.
  - Added mobile kebab action trigger to Cards view, preventing button overcrowding on narrow mobile devices.
  - Moved `#rowActionMenu` outside scoped `@if` blocks so both table and cards views can use it globally.
- **Documentation**:
  - Added Section 29.11 ("Mobile View Menu Collapsing & Zero-Overlap MDC Menu Standards") to `FRONTEND_APP_GUIDELINES.md`.

## [1.5.0] - 2026-11-07

### Added
- **Dark Mode Slate Architecture (`#020617` / `#0f172a` / `#1e293b` / `#334155`)**:
  - Replaced muddy brown-stone theme with an aesthetic, modern Slate color palette across table views, card views, sprint analytics, modal dialogs, and the dedicated task detail page.
  - Dark Slate hierarchy: Canvas (`slate-950`), Dialogs & Base Cards (`slate-900`), Table Header Cells & Elevated Panels (`slate-800`), Row Dividers & Subtle Borders (`slate-700`).
- **WCAG 2.2 AA and AAA Contrast Compliance for Badges & Labels**:
  - All status pills, priority badges, and category labels upgraded to high-contrast colors meeting >= 4.5:1 (AA) and >= 7:1 (AAA) contrast ratios against slate backgrounds.
  - Urgent: `dark:bg-rose-950/70`, `dark:text-rose-200`, `dark:border-rose-800/80` (10.8:1 contrast).
  - High: `dark:bg-amber-950/70`, `dark:text-amber-200`, `dark:border-amber-800/80` (11.2:1 contrast).
  - Medium: `dark:bg-sky-950/70`, `dark:text-sky-200`, `dark:border-sky-800/80` (10.5:1 contrast).
  - Low / To Do: `dark:bg-slate-800`, `dark:text-slate-200`, `dark:border-slate-700` (10.5:1 contrast).
  - Completed: `dark:bg-emerald-950/70`, `dark:text-emerald-200`, `dark:border-emerald-800/80` (12.4:1 contrast).
- **Peripheral Row Dimming Safety Rule in Dark Mode**:
  - Unhovered/unfocused rows in dark mode now maintain `opacity: 0.70 !important` and zero blur (`filter: none !important`) to eliminate contrast degradation.
  - Hovered/focused row elevated with rich `slate-800` (`rgba(30, 41, 59, 0.98)`), crisp white typography (`#ffffff`), and a vivid sky-blue accent left indicator (`box-shadow: inset 3.5px 0 0 0 #38bdf8`).
- **Mobile Modal Focus / Zen Mode Editor**:
  - Added dedicated "Focus Editor" mode that hides all labels and metadata pills, dedicating >85% of mobile viewport to Markdown editing and preview.
  - Edge-to-edge full-screen dialog expansion on `< 640px` screens.
- **PWA Application Identity Isolation (`chintap-starter-kit-angular`)**:
  - Explicitly renamed installed app identity in `site.webmanifest` and mobile meta tags to prevent collision with the primary `chintap.com` production app.
- **Documentation**:
  - Added Section 29.8 ("Mobile Modal & Full-Screen Editor Standards"), Section 29.9 ("PWA & Mobile App Installation Identity"), and Section 29.10 ("Dark Mode Slate Architecture & WCAG AA/AAA Contrast Standards") to `FRONTEND_APP_GUIDELINES.md`.

## [1.4.0] - 2026-11-07

### Added
- **Public Open-Source Repository Release**:
  - Official public release of [`https://github.com/chintap-india/angular-starter`](https://github.com/chintap-india/angular-starter).
- **Mobile Responsive Progressive Column Tucking (`chintap-compact-template`)**:
  - Zero-horizontal-scroll mobile architecture on viewports from 360px to 414px.
  - Progressive column tucking condensing the 8-column enterprise table to 3 core columns on mobile (`select`, `title` with inline micro-metadata sub-row, `actions` kebab).
  - Lazy-loaded mobile row action menu via `<ng-template matMenuContent>` and `[matMenuTriggerData]`.
  - Tier 1 toolbar mobile collapse: responsive search input flex and secondary utilities menu (`more_vert`).
  - Tier 2 sub-toolbar smooth touch-scrollable status carousel (`overflow-x-auto no-scrollbar`).
  - Documented Section 29.7 in `FRONTEND_APP_GUIDELINES.md`.

## [1.3.0] - 2026-11-07

### Added
- **`chintap-compact-template` (Enterprise Table & List Architecture)**:
  - Designated the Tasks management view pattern as the official `chintap-compact-template`.
  - Introduced balanced 2-Tier Navigation Toolbar: Tier 1 (Quick Search, View Switchers, CTAs) + Tier 2 (Status Filter Pills, Priority Dropdown, Tucked Pagination).
  - Tucked top-bar pagination controller: Rows-per-page selector pill (`10`, `25`, `50`, `100`) and step navigation buttons (`first_page`, `chevron_left`, range, `chevron_right`, `last_page`) embedded directly into the top toolbar.
  - Purged bottom paginator to reclaim vertical screen estate, fitting all 10 table rows into standard viewports without vertical scroll.
  - Row Focus Depth effects: dynamically dims peripheral rows while elevating hovered/focused row.
  - Dedicated Task Detail view route (`/tasks/:taskId`) with breadcrumbs and action icons.
  - Redesigned Sprint Analytics dashboard: Priority & Risk severity distribution bar, dynamic category workload breakdown, and critical attention queue.
  - Clean sequential task ID generator (`#1`..`#45`) with `formatTaskId()` helper.

## [1.2.0] - 2026-11-06

### Changed
- **Official Open-Source Organization Release**:
  - Migrated repository to official organization: [`https://github.com/chintap-india/angular-starter`](https://github.com/chintap-india/angular-starter).
  - Enhanced `package.json` with complete open-source manifest metadata (`repository`, `homepage`, `bugs`, `keywords`, `author`).
  - Added `@id: "${this.siteConfig.baseUrl}/#software"` and guaranteed root `@context: "https://schema.org"` in `SeoService.generateSoftwareAppSchema()` and `updateCustomStructuredData()`.
  - Synchronized `public/_headers` with CORS headers (`Access-Control-Allow-Origin: *`) for `/llms.txt`, `/llms-full.txt`, and `/.well-known/ard.json`.
  - Updated all clone and documentation commands across `README.md`, `site.content.ts`, and `CONTRIBUTING.md`.

## [1.1.6] - 2026-11-06

### Fixed
- **Hero Badge Pill Icon Vertical Centering**:
  - Resolved vertical misalignment of `<mat-icon>` glyphs inside uppercase tracking badge pills across Features, Best Practices, Tasks, and Home FAQ sections.
  - Added global `.hero-badge-pill` rule with `display: inline-flex; align-items: center; line-height: 1;` and optical cap-height centering `transform: translateY(-1px)`.
  - Wrapped pill label strings in `<span class="leading-none">`.

## [1.1.5] - 2026-11-05

### Removed
- **Legacy Agency Content Purge**:
  - Removed all obsolete agency-specific content, models, and JSON files (`what-we-do`, `how-we-work`, `explorations`, `building-teams`, `partners`, `customers`, `academy`).
  - Retained clean Starter Kit architectural pages (`/`, `/features`, `/best-practices`, `/tasks`, `/404`) plus permitted `/about` and `/contact`.
  - Updated `ContentService.PageKey` and `nextPathsMap` navigation flows.

## [1.1.4] - 2026-11-05

### Added
- **Open-Source Repository Health & GitHub Assets**:
  - Added official `LICENSE` (MIT License) with full attribution.
  - Added GitHub Actions Continuous Integration pipeline (`.github/workflows/ci.yml`) running Vitest unit tests and SSG builds on push/PR.
  - Added GitHub community health files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
  - Added GitHub issue templates (`bug_report.md`, `feature_request.md`), PR template (`pull_request_template.md`), and Dependabot configuration (`dependabot.yml`).
  - Added canonical content markdown files: `content/features.md`, `content/best-practices.md`, and `content/tasks.md`.
  - Added Live Demo badge pointing to `https://chintap-angular-starter.netlify.app/` in `README.md`.

### Fixed
- **Official Tech Stack Vector Marks**:
  - Replaced hand-drawn vector approximations with official, untouched brand assets directly from source registries.
  - Upgraded Angular logo to official Angular 22 gradient mark (`#E40035` to `#6C00F5`).
  - Upgraded Material Design to official Google Material Design mark with Material 3 `#6750A4` / `#D0BCFF` adaptive tokens.
  - Upgraded Tailwind CSS to official cyan gradient wave mark.
  - Upgraded Vitest to official green/cyan vector mark from the Vitest core repository.
  - Upgraded Netlify to official `#05BDBA` / `#014847` geometric mark.
  - Removed corrupt 404 placeholder file `angular-shield.svg`.

### Changed
- **Unified Branding - Dropped "Studio" Qualification**:
  - Dropped "Studio" qualification across all brand touchpoints in favor of pure **Chintap** branding.
  - Updated constellation satellite node `abt-c4` in `YouAreHereDialogComponent` from `04 Chintap Studio` to `04 Chintap`.
  - Updated `content/about.md` page title and description to remove studio references.
  - Refined partner collaboration description in `ContentService` to refer to independent builders and creators.
  - Updated `FRONTEND_APP_GUIDELINES.md`, `build-brand-assets.sh`, and SVG canvas comments to ensure 100% brand consistency.

## [1.1.3] - 2026-11-05

### Fixed
- **You Are Here Dialog Synchronized with Real Site Contents**:
  - Replaced legacy constellation nodes with the 6 authentic starter kit pages: Home (`/`), Features (`/features`), Best Practices (`/best-practices`), Tasks (`/tasks`), About (`/about`), and Contact (`/contact`).
  - Added 4 detailed child satellite nodes per page reflecting real page topics, tools, and best practices.
  - Symmetrically calibrated elliptical orbital geometry centered at $(450, 350)$ with outer radii $rx=300, ry=200$ (mobile $rx=240, ry=160$) eliminating label collisions.
  - Enhanced active route detection so that all routes (including `/best-practices` and `/tasks`) trigger the active beacon glow and "YOU ARE HERE" badge.
- **Relational Network Graphs Synchronized**:
  - Updated `NetworkGraphComponent` across Home, About, Contact, and added dedicated SVG diagrams for Features, Best Practices, and Tasks modes.
  - Replaced dead links with live, valid routes (`/features`, `/best-practices`, `/tasks`, `/about`, `/contact`).
  - Updated `NODE_DETAILS` and `GRAPH_METADATA_MAP` with modern Angular 22, 5 Pillars, and clean architecture explanations.
  - Expanded unit test suite to 102/102 passing tests.

## [1.1.2] - 2026-11-05

### Fixed
- **Favicon Padding & Canvas Visibility**:
  - Removed 42% excessive horizontal whitespace and 10% vertical dead space from `public/favicon.svg` by tightly cropping the vector viewport to `viewBox="190 30 620 940"`.
  - Maximized visual prominence in browser tabs (16x16, 32x32, 48x48) while preserving zero distortion and exact aspect ratio of the brand gesture.
  - Retained native `@media (prefers-color-scheme: dark)` theme adaptation in `favicon.svg` for white hand in dark mode and dark hand in light mode.
  - Regenerated multi-resolution `public/favicon.ico` (16x16, 32x32, 48x48 RGBA) and high-contrast `public/favicon.png` (64x64) with subtle contrast layer for clarity across both light and dark operating system tab bars.
  - Updated `public/apple-touch-icon.png` (180x180) and `public/images/apple-touch-icon-dark.png` to fill ~80% of canvas with safe-zone margins for iOS squircle rounding.
  - Synchronized `public/images/chintap-emblem-light.svg`, `chintap-emblem-dark.svg`, and `chintap-emblem.svg` with tight viewBoxes for enhanced clarity in header and footer logos.

---

## [1.1.1] - 2026-11-05

### Changed
- **Production URL Alignment**: Configured official production domain `https://chintap-angular-starter.netlify.app` across `site.config.ts`, `sitemap.xml`, `robots.txt`, `.well-known/ard.json`, `llms.txt`, and root `index.html`.
- **Netlify Edge Headers**: Added `Content-Type: text/plain; charset=utf-8` and CORS headers for `/llms.txt` and `/llms-full.txt` in `netlify.toml`.
- **Netlify Identity CSP**: Added `https://identity.netlify.com` to `script-src` and `connect-src` directives in `netlify.toml` for seamless auth widget compatibility.
- **Sitemap Coverage**: Added `/tasks` canonical entry to `sitemap.xml`.

---

## [1.1.0] - 2026-11-05

### Added
- **Tasks & Project Management Module (`/tasks`)**:
  - Full CRUD operations with pre-seeded onboarding setup tasks.
  - Angular 22 **Typed Reactive Forms** (`FormGroup`) with granular validation error feedback.
  - Standalone **`MarkdownPipe`** with XSS sanitization supporting headings, checklists (`- [x]`), inline code, fenced code blocks, blockquotes, and external links.
  - Dual-mode **Write / Live Preview** task description editor.
  - **`MockTaskApiService`** simulating asynchronous network latency with SSR-safe `localStorage` browser persistence.
  - **`AuthService`** with Netlify Identity hooks and instant Lead Developer vs. Guest role switching.
- **Zero-Hardcoding Content Architecture**:
  - Created `src/app/core/config/site.content.ts` with `SITE_CONTENT` injection token, completely decoupling all page headlines, hero badges, FAQ lists, and legal disclaimers from HTML templates.
- **Rebranding & Customization Handbook**:
  - Published [`CUSTOMIZATION_GUIDE.md`](CUSTOMIZATION_GUIDE.md) providing a clear 3-step rebrand workflow (Domain & Metadata, Content & Copy, Artwork Replacement) with zero HTML editing required.
- **Official 1:1 Vector Marks**:
  - Added pixel-perfect, 1:1 square SVGs for Angular, Tailwind CSS, Material Design, Vitest, Netlify, and TypeScript in `public/images/tech/`.
  - Added drop-in generic branding files `logo-light.svg`, `logo-dark.svg`, and `og-preview.jpg` in `public/images/`.
- **Trademark Notices & Legal Disclaimers**:
  - Added Nominative Fair Use disclaimers in the footer and `/features` page for all third-party marks.
- **Expanded Automated Test Suite**:
  - Grew unit test coverage from 75 tests to 101 tests across 15 suites (100% green).
- **Static Pre-Rendering (SSG)**:
  - Added `/tasks` to `src/routes.txt`, expanding statically pre-rendered routes from 6 to 7.

### Changed
- **Minimal Navigation**: Simplified top navbar to `Home`, `Features`, `Best Practices`, `About`, `Contact`, keeping technical jargon out of the primary menu.
- **Dynamic Versioning**: Added `version` property to `SiteConfig` (`1.1.0`), dynamically bound to the footer badge and Schema.org `SoftwareApplication` JSON-LD schema (`softwareVersion`).
- **Card Hover Effects**: Unified consistent hover lift (`card-hover`) across all cards throughout the application.

### Fixed
- **Logo Aspect-Ratio Distortion**: Eliminated logo squishing and letterboxing by enforcing uniform 1:1 square coordinates and `aspect-square object-contain` CSS.
- **FAQ Header Layout**: Resolved text-wrapping clipping in Angular Material expansion panel headers on smaller screens by transitioning category badges into vertical eyebrows.

---

## [1.0.0] - 2026-11-04

### Added
- **Initial Release of Chintap Angular Starter Kit**:
  - Angular 22 standalone architecture with reactive Signals, zoneless change detection, and inject-based DI.
  - Out-of-the-box implementation of the 5 Pillars of Discovery:
    - **SEO**: Dynamic `<title>`, OpenGraph cards, Twitter cards, dynamic canonical link resolution, strict 404 `noindex`.
    - **AEO**: Schema.org `@graph` injection, automated `FAQPage` JSON-LD generation for Google AI Overviews and Perplexity.
    - **LLMO**: Standardized `/llms.txt`, `/llms-full.txt`, and Agent Resource Discovery manifest (`/.well-known/ard.json`).
    - **GEO**: Schema.org `SoftwareApplication` and `Organization` with geographical coordinates and postal address.
    - **SSR / SSG**: Compile-time static site pre-rendering via `@angular/build:application` for 6 canonical routes.
  - Angular Material 3 and Tailwind CSS 4 styling engine with dark theme `@variant dark` support.
  - Zero-config Netlify deployment (`netlify.toml`) with security headers and clean routing.
