# Contributing to Chintap Angular Starter Kit

Thank you for your interest in contributing to the **Chintap Angular Starter Kit**! We welcome contributions from developers of all skill levels.

---

## ️ Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/chintap-india/angular-starter.git
   cd angular-starter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm start
   ```
   Navigate to [http://localhost:4200](http://localhost:4200).

---

## Testing Guidelines

Before opening a pull request, ensure all unit tests pass:

```bash
# Run unit test suite (Vitest)
npm test -- --watch=false
```

To run individual test files:
```bash
npx vitest run src/app/shared/components/navbar/navbar.component.spec.ts
```

---

## ️ Production Build Verification

Always test the static site generation (SSG) pipeline:

```bash
npm run build
```

Verify that all static routes pre-render to `dist/chintap-angular-starter/browser/` without runtime hydration warnings or memory errors.

---

## Coding Conventions

- **Signals & Zoneless**: Prefer Angular Signals (`signal()`, `computed()`) and zoneless change detection over Zone.js and manual subscriptions.
- **Standalone Components**: All Angular components must be standalone (`standalone: true` or default in Angular 22).
- **Zero Inline Hardcoding**: Store all user-facing copy and links in `src/app/core/config/site.content.ts` or `src/app/core/config/site.config.ts`.
- **Zero Logo Distortion**: Never apply non-proportional scaling or distortions to brand and framework logos.
- **Accessibility (a11y)**: Maintain semantic HTML tags, explicit `aria-label` attributes on icon-only buttons, and keyboard navigation.
- **Free-Tier Discipline**: Keep all features, integrations, and deployment options 100% compliant with free-tier services.

---

## Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

- `feat(scope): add new feature`
- `fix(scope): resolve a bug`
- `docs(scope): update documentation`
- `style(scope): formatting or styling without logic changes`
- `refactor(scope): internal code cleanup`
- `test(scope): add or modify tests`
- `chore(scope): build pipeline or dependency bumps`

---

## License

By contributing to this repository, you agree that your contributions will be licensed under the [MIT License](LICENSE).
