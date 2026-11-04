# 16-Week Internship Programme
## Full-Stack Web & Mobile App Development with AI Assistance

**Programme structure:** 12 weeks of structured training + 4 weeks of live projects  
**Primary outcome:** Interns can plan, build, test, deploy, document, and present an end-to-end web/mobile product using AI coding assistants responsibly.

---

## Programme Overview

This programme takes interns from programming and developer-tool foundations through backend development, two frontend frameworks, mobile app development, quality engineering, deployment, and a four-week live project.

### Core technology stack

| Area | Technologies | Purpose |
|---|---|---|
| Language | JavaScript, TypeScript | Shared language across backend, web and mobile |
| Backend | Node.js, NestJS | Modular backend services and REST APIs |
| Database | MongoDB, Mongoose | Persistence, schemas, relationships and queries |
| Frontend | Angular | Component-based web application development |
| Frontend | React | Component-based web application development |
| Mobile | React Native, Expo | Cross-platform Android/iOS application development |
| Testing | Unit/integration tests, Playwright, API testing tools | Verify application behavior and reduce regressions |
| Engineering workflow | Git, GitHub, pull requests, code review | Collaboration and source control |
| Delivery | CI/CD, environment configuration, deployment, logging | Build and operate applications reliably |
| AI-assisted engineering | Coding assistants and AI chat tools | Planning, implementation, debugging, testing, refactoring and documentation |

### Programme journey

| Weeks | Module | Main outcome |
|---|---|---|
| 1–2 | Foundations & developer tools | TypeScript basics, HTTP, responsive UI, Git and AI-assisted workflow |
| 3–4 | Backend development | Secure, documented NestJS API with MongoDB |
| 5–6 | Frontend development with Angular | Functional Angular web client integrated with the API |
| 7–8 | Frontend development with React | Functional React web client integrated with the same API |
| 9–10 | Mobile app development | React Native + Expo app connected to the shared backend |
| 11–12 | Quality engineering, testing & DevOps | Automated tests, CI/CD, deployment and release readiness |
| 13 | Live project: planning & design | Scope, user stories, architecture, data model and task plan |
| 14 | Live project: development sprint | Integrated backend, web and mobile features |
| 15 | Live project: testing & deployment | Regression testing, bug fixes, CI/CD and deployed release candidate |
| 16 | Live project: final delivery | Demo, documentation, retrospective and final assessment |

---

# Part 1 — Structured Training (Weeks 1–12)

## Weeks 1–2: Foundations & Developer Tools

### Goal
Bring interns with mixed programming experience to a common foundation and teach a repeatable developer workflow.

### Core foundations
- JavaScript and TypeScript basics
- Variables, functions, objects, arrays, types, interfaces and type aliases
- Async programming: promises, `async`/`await` and error handling
- HTTP, JSON, request/response flow and client/server basics
- HTML, CSS, semantic markup and responsive layouts
- Browser DOM, events and developer tools
- Reading error messages, inspecting network requests and debugging

### Tools and team workflow
- Node.js and npm
- VS Code or an equivalent editor
- Git and GitHub: repositories, commits, branches and pull requests
- Browser DevTools: console, network panel, elements and source debugging
- Markdown, README files and clear technical notes
- Coding assistants: chat, inline completion and repository-aware workflows

### AI-assisted engineering workflow
1. Understand the requirements and acceptance criteria.
2. Ask AI to help break work into small, reviewable tasks.
3. Generate or modify one small part at a time.
4. Run the code, inspect behavior and test edge cases.
5. Review the diff, understand the implementation and document the result.

### Hands-on assignments
- Build a small typed task tracker in the browser.
- Create a Git repository, work on a feature branch and submit a pull request.
- Build a responsive task-list page.
- Debug a seeded defect using browser tools and error messages.
- Use AI to explain code, suggest tests and compare alternative implementations.

### Mini project: Task Tracker Starter
Build a simple, responsive task list with:
- Typed task data
- Add and complete actions
- Clear empty, success and error states
- Basic input validation
- README with setup and usage instructions

### Learning outcomes
Interns can:
- Read and write basic TypeScript.
- Explain request/response flow and basic API behavior.
- Use Git branches and pull requests.
- Debug simple issues using logs and browser tools.
- Use AI suggestions critically rather than copying blindly.
- Explain, run and verify code before submitting it.

### Assessment evidence
- TypeScript exercise
- Small working task tracker
- Pull request and code review
- Debugging exercise
- Short explanation of an AI-assisted change

---

## Weeks 3–4: Backend Development with NestJS

### Goal
Build a secure, maintainable and documented REST API that can serve Angular, React and mobile clients.

### Core topics
- Node.js runtime and NestJS project structure
- Modules, controllers, providers and dependency injection
- REST API design, HTTP methods, status codes and response formats
- DTOs, validation, pipes and input normalization
- MongoDB, Mongoose, schemas, models and data relationships
- CRUD operations, filtering, sorting and pagination
- Authentication, JWT/session concepts, roles, guards and authorization
- Ownership checks and least-privilege access
- Error handling, exceptions, logging and environment configuration
- Swagger/OpenAPI documentation
- Unit, integration and end-to-end API testing
- Health checks, secrets management and deployment basics

### Hands-on assignments
1. Create a NestJS project and connect it to MongoDB.
2. Build CRUD endpoints for users, projects or tasks.
3. Add DTO validation and consistent error responses.
4. Implement authentication and role/ownership-based authorization.
5. Write unit and integration tests, including negative cases.
6. Document endpoints with Swagger/OpenAPI.
7. Prepare a reproducible local setup and environment template.

### Mini project: Task Management API
Build a backend API that supports:
- User registration/sign-in or an agreed authentication starter
- User roles and protected endpoints
- Task creation, listing, editing and completion
- Ownership checks and access control
- Pagination, search and filtering
- DTO validation and consistent errors
- Swagger documentation
- Unit and integration tests
- Environment configuration and deployment readiness

### Learning outcomes
Interns can:
- Explain NestJS modules, controllers, providers and services.
- Design and implement REST APIs.
- Model and query data using MongoDB/Mongoose.
- Validate inputs and enforce authorization.
- Write useful backend tests.
- Document and run the API reliably.

### Assessment evidence
- API design review
- Data-model walkthrough
- Validation and authorization tests
- Test suite review
- Live API demonstration

---

## Weeks 5–6: Frontend Development with Angular

### Goal
Build a responsive Angular web application using maintainable components and sound application structure.

### Core topics
- Angular project setup and CLI
- Standalone components, templates, bindings, directives and pipes
- Component inputs/outputs and composition
- Services and dependency injection
- Routing, route parameters, guards and lazy loading concepts
- Forms: template-driven and reactive forms
- Validation, error messages and accessible form controls
- Signals and RxJS fundamentals; state ownership and derived state
- HTTP client, API services, interceptors and error handling
- Loading, empty, success and failure states
- Reusable UI, responsive layouts and accessibility
- Angular Material or an agreed component system
- Unit/component/service testing
- Build configuration and deployment

### Hands-on assignments
1. Create an Angular app with reusable components and routing.
2. Build task list, task detail and create/edit screens.
3. Implement form validation and server-side error display.
4. Connect the app to the NestJS API.
5. Add loading, empty, retry and error states.
6. Test components, services and important user interactions.
7. Review accessibility and responsive behavior.
8. Build and deploy the frontend.

### Mini project: Angular Task Management App
Build a web client that supports:
- Listing and filtering tasks
- Creating, editing and completing tasks
- Form validation
- API integration
- Authentication-aware screens as appropriate
- Loading and error states
- Responsive, accessible UI
- Automated tests
- Deployment and README

### Learning outcomes
Interns can:
- Build reusable Angular components.
- Organize services and application state.
- Implement routes and forms.
- Integrate a REST API.
- Test UI behavior and handle failures.
- Build and deploy an Angular application.

### Assessment evidence
- Angular feature demonstration
- Component/state design explanation
- API integration and error-state checks
- Test review
- Pull request and deployment review

---

## Weeks 7–8: Frontend Development with React

### Goal
Teach React in depth by implementing the same core business workflow against the shared backend.

### Core topics
- React project setup with TypeScript
- Function components, JSX, props and composition
- Rendering, keys and reusable components
- State, events, immutable updates and lifting state
- Hooks: `useState`, `useEffect`, custom hooks and dependency management
- Async data loading, cleanup and race-condition awareness
- Routing, nested routes and protected-route concepts
- Forms, validation and accessible feedback
- Typed API clients and request abstractions
- Local state vs shared state; Context and reducer patterns
- Data-fetching and caching concepts
- Responsive UI, accessibility and performance basics
- Component and interaction testing
- Build configuration and deployment

### Hands-on assignments
1. Create a React + TypeScript app with reusable components.
2. Build task list, detail and create/edit screens.
3. Implement routing and form validation.
4. Connect to the NestJS API.
5. Handle loading, empty, error and retry states.
6. Test components and user-visible interactions.
7. Improve responsive behavior and accessibility.
8. Deploy the React app.
9. Implement one small feature in both Angular and React and document the trade-offs.

### Mini project: React Task Management App
Build a React web client with:
- Task CRUD and filtering
- Routing and forms
- Typed API integration
- Appropriate state management
- Loading and error handling
- Responsive and accessible UI
- Automated tests
- Deployment and documentation

### Angular vs React comparison
Interns should compare based on hands-on evidence:
- Component and template models
- Dependency injection and service patterns
- Forms and validation
- Routing
- State-management approaches
- Testing tools and practices
- Project conventions and ecosystem trade-offs

### Learning outcomes
Interns can:
- Build typed React components and reusable hooks.
- Manage local and shared state appropriately.
- Integrate APIs and handle asynchronous behavior.
- Test user-visible interactions.
- Explain practical trade-offs between Angular and React.

### Assessment evidence
- React feature demonstration
- State/effect debugging exercise
- Test review
- Framework comparison note
- Pull request and deployment review

---

## Weeks 9–10: Mobile App Development with React Native + Expo

### Goal
Build a real mobile client that consumes the shared NestJS API and behaves appropriately on mobile devices.

### Core topics
- React Native vs browser React
- Expo project setup, SDK and app configuration
- Native components, styling, Flexbox and platform differences
- Navigation: stack, tabs and route parameters
- Mobile forms, lists, touch targets and keyboard behavior
- API integration and environment-specific URLs
- Authentication/session lifecycle and secure storage choices
- Permissions and device features such as camera or image picker
- Connectivity, retry behavior and offline/error states
- Component testing and device/emulator debugging
- Build and release concepts with Expo Application Services (EAS)
- Overview of publishing workflows for Android and iOS

### Hands-on assignments
1. Create an Expo app and run it on an emulator or device.
2. Build list, detail and create/edit screens.
3. Add stack/tab navigation.
4. Connect the mobile app to the NestJS API.
5. Implement session handling and permissions appropriately.
6. Integrate one relevant device capability.
7. Handle network errors and offline states.
8. Test core behavior and troubleshoot on a device/emulator.
9. Produce a test build and document the build process.

### Mini project: Mobile Task Management App
Build a React Native + Expo app with:
- Task list and details
- Create/edit/complete actions
- Navigation
- Shared backend integration
- Appropriate session handling
- Clear loading and network-error states
- One device feature where relevant
- Tests for important components or flows
- Test build and setup documentation

### Learning outcomes
Interns can:
- Build cross-platform mobile screens with React Native.
- Implement navigation and forms.
- Consume backend APIs.
- Handle device permissions and platform differences.
- Debug and test on an emulator or device.
- Explain the mobile build and publishing process.

### Assessment evidence
- Live mobile demonstration
- API and navigation checks
- Permissions/session walkthrough
- Debugging exercise
- Test build and documentation

---

## Weeks 11–12: Quality Engineering, Testing & DevOps

### Goal
Prepare the full-stack application for reliable testing, continuous integration and deployment.

### Core topics
- Test strategy, risk-based testing and the test pyramid
- Unit, integration, API and end-to-end tests
- Playwright for web UI and API workflows
- API testing with an agreed tool such as Postman
- Test data, fixtures, assertions and deterministic tests
- Debugging failed tests and flaky behavior
- Security fundamentals: validation, authorization, secrets and sensitive logging
- Dependency hygiene and basic threat modeling
- Docker fundamentals and consistent development environments
- GitHub Actions or equivalent CI workflow
- Build, lint, type-check and test stages
- Environment variables and secrets in deployment
- Cloud or managed-platform deployment
- Health checks, logs, smoke tests and release readiness
- Rollback concepts and release documentation

### Hands-on assignments
1. Create a risk-based test plan for core user journeys.
2. Write API tests for success and failure cases.
3. Automate critical web workflows with Playwright.
4. Add useful tests for selected mobile components or flows.
5. Fix seeded bugs and add regression tests.
6. Add lint, type-check, test and build stages to CI.
7. Containerize an appropriate service or local environment.
8. Deploy the application to a suitable test environment.
9. Add smoke checks and a release checklist.

### Mini project: CI/CD for the Full-Stack App
Create a repeatable delivery pipeline that:
- Runs linting and type checks
- Runs unit/integration tests
- Runs critical automated API/UI tests where appropriate
- Builds the application
- Uses environment configuration safely
- Deploys to a test/staging environment
- Runs smoke checks
- Documents release steps and known limitations

### Learning outcomes
Interns can:
- Choose tests based on risk.
- Write and debug automated tests.
- Understand CI/CD and deployment basics.
- Avoid common secret-handling and authorization mistakes.
- Diagnose build/test failures from logs.
- Prepare a release with evidence of quality.

### Assessment evidence
- Test plan and automation review
- Seeded-failure debugging
- CI pipeline run
- Deployment and smoke-test evidence
- Security and release-readiness checklist

---

# Part 2 — Live Project (Weeks 13–16)

## Live Project Goal

For four weeks, interns work in small teams to build and deliver a real, scoped product. They apply the skills learned during training in a realistic development workflow, from requirements through deployment and presentation.

The project should be challenging enough to require engineering judgment, but small enough to finish within four weeks. Scope should be agreed with a mentor and prioritized into must-have, should-have and stretch features.

## Example project ideas
- School communication platform: notices, events and parent/educator communication
- Habit tracker: daily habits, progress and reminders
- Inventory management: items, users, stock movements and basic reporting
- Community app: groups, posts and simple interactions
- Internship/task management platform
- Appointment or booking workflow
- Internal operations dashboard

## Week 13: Planning & Design

### Activities
- Confirm the user problem, audience and project scope.
- Gather requirements and identify non-goals.
- Write user stories and acceptance criteria.
- Define must-have, should-have and stretch features.
- Sketch user journeys and wireframes.
- Design the data model and API contracts.
- Decide team roles and ownership areas.
- Create the repository and agree on branch/PR conventions.
- Break work into small tasks and estimate priorities.
- Identify security, privacy and technical risks.

### Deliverables
- Project brief
- User stories and acceptance criteria
- Wireframes or UI sketches
- Architecture diagram
- Data model and API contract
- Prioritized backlog
- Repository and development setup
- Initial test plan

### Milestone M1
**Scope and architecture approved by the mentor.**

---

## Week 14: Development Sprint

### Activities
- Implement a vertical slice through database, backend, frontend and mobile where applicable.
- Build backend modules, endpoints and validation.
- Implement the agreed web client(s) and mobile client scope.
- Integrate the clients with the shared API.
- Use feature branches and small pull requests.
- Conduct regular code reviews.
- Add tests alongside features.
- Integrate continuously instead of leaving integration until the end.
- Use AI assistants for planning, scaffolding, debugging and review, while verifying all output.

### Deliverables
- Working backend for prioritized features
- Usable web workflow
- Mobile workflow if included in the agreed scope
- Initial automated tests
- Reviewed pull requests
- Updated documentation and backlog

### Milestone M2
**Demonstrate a working end-to-end vertical slice.**

---

## Week 15: Testing & Deployment

### Activities
- Complete prioritized features and integration.
- Test positive, negative, permission and boundary cases.
- Run exploratory testing and a team bug bash.
- Fix high-priority defects and add regression tests.
- Verify consistent behavior across clients.
- Review accessibility and responsive/mobile usability.
- Complete CI checks and deployment configuration.
- Deploy a release candidate.
- Run smoke tests and verify environment configuration.
- Prepare setup instructions, test evidence and known limitations.

### Deliverables
- Release candidate
- Automated test results
- Bug list with priorities and resolutions
- CI pipeline
- Deployed test/staging application
- Smoke-test evidence
- Updated README and known-limitations list

### Milestone M3
**Release candidate deployed and reviewed.**

---

## Week 16: Final Delivery

### Activities
- Run final regression and smoke tests.
- Resolve release-blocking issues.
- Finalize architecture and setup documentation.
- Prepare a product demonstration.
- Present key user journeys and explain technical decisions.
- Demonstrate tests and deployment.
- Discuss known limitations and future improvements.
- Conduct a retrospective on teamwork, AI use and engineering practices.
- Complete individual code-comprehension and debugging assessments.

### Final deliverables
- Source code in GitHub
- Deployed application or documented demo build
- Setup and environment instructions
- Architecture and API documentation
- Automated tests and test evidence
- Release notes and known limitations
- Live presentation or recorded demo
- Team retrospective
- Individual learning reflection

### Milestone M4
**Final product demonstrated, documented and assessed.**

---

# AI-Assisted Development: Programme-Wide Practice

AI coding assistants are used throughout all 16 weeks. They are not a shortcut around engineering fundamentals; they are tools for improving planning, implementation speed, debugging, testing and learning.

## The iterative development workflow

1. **Understand:** Read the requirement, repository, acceptance criteria and relevant documentation.
2. **Plan:** Ask the assistant to break the work into small tasks, identify assumptions and suggest tests.
3. **Design:** Agree on interfaces, data shapes, module boundaries and expected behavior before large changes.
4. **Implement:** Generate or modify one small, reviewable unit at a time.
5. **Run:** Execute the code and inspect actual behavior.
6. **Test:** Add or run tests for expected behavior, edge cases and failure paths.
7. **Debug:** Reproduce errors, inspect logs, form hypotheses and verify fixes.
8. **Review:** Inspect diffs for correctness, security, complexity and unintended changes.
9. **Explain:** Be able to explain the implementation and its trade-offs.
10. **Document:** Update relevant README, API documentation and usage instructions.

## Example: Building a task-management feature incrementally

Do not ask an assistant to build the entire application in one prompt. Use a sequence of focused tasks.

### Step 1 — Plan the feature

**Example prompt**

> I am building a task-management feature in a NestJS + MongoDB backend with Angular and React clients. Help me break the feature into small implementation tasks. List assumptions, data entities, API endpoints, validation rules, authorization concerns and acceptance criteria. Do not generate code yet. Ask questions where requirements are ambiguous.

**Expected output:** A feature plan, assumptions, API outline and test scenarios.

### Step 2 — Review the data model and API contract

**Example prompt**

> Propose a Mongoose schema and TypeScript types for tasks with title, description, status, due date, owner and timestamps. Include validation rules, likely indexes and authorization considerations. Explain trade-offs and show only the model/type files first. Do not create controllers or frontend code yet.

**Expected output:** A reviewable model/type proposal.

### Step 3 — Implement one backend module

**Example prompt**

> In the existing NestJS repository, implement the task module only: DTOs, controller, service and module wiring. Follow the repository's existing conventions. Include input validation, consistent errors and ownership checks. Do not modify unrelated files. First state which files you plan to change, then implement the smallest coherent change.

**Expected output:** A small backend change with a clear file list.

### Step 4 — Run and verify the backend

**Example prompt**

> Review the task module against these acceptance criteria: [paste criteria]. Identify missing behavior and propose unit/integration tests for success, validation failure, unauthorized access and not-found cases. Do not claim tests pass unless they have actually been run. Explain any assumptions.

**Expected output:** Test cases and a gap list; the intern runs the tests and verifies behavior.

### Step 5 — Build one frontend component at a time

**Example prompt**

> Implement the task-list component in the existing Angular app using the current API client and UI conventions. Include loading, empty, error and success states. Do not introduce a new state library. Show the files to be changed and explain how the component will be tested.

For React, use a separate prompt adapted to the existing React project rather than asking the assistant to rewrite both frameworks at once.

**Expected output:** One focused component, its API integration and test plan.

### Step 6 — Add tests

**Example prompt**

> Create tests for task creation and task-list behavior. Cover valid input, invalid input, server errors and empty results. Use the test tools already installed in the repository. Explain what each test proves and identify any important behavior not covered.

**Expected output:** Focused tests that the intern reviews, runs and improves.

### Step 7 — Debug and refactor

**Example prompt**

> Here is the reproducible behavior, relevant code and error output: [paste details]. Give me three plausible root causes, ranked by evidence, and tell me how to distinguish them. Do not rewrite the whole module. After identifying the cause, suggest the smallest safe fix and a regression test.

**Expected output:** Testable debugging hypotheses and a minimal fix.

### Step 8 — Review before merging

**Example prompt**

> Review this diff for correctness, security, maintainability, unnecessary complexity and unintended behavior. Focus on concrete issues and cite the relevant file or line. Separate confirmed problems from suggestions. Do not make changes yet.

**Expected output:** A prioritized review list that the intern validates before changing code.

## Prompting best practices
- Give the assistant the relevant repository context, framework versions and existing conventions.
- State the task, boundaries, acceptance criteria and constraints.
- Ask for a plan before large changes.
- Break work into small steps with explicit outputs.
- Ask for explanations and trade-offs, not just code.
- Include error messages and reproducible steps when debugging.
- Ask for edge cases and negative tests.
- Review the diff and verify the behavior independently.
- Update documentation only with facts confirmed from the actual application.

## Common pitfalls to avoid
- Asking for an entire production application in one prompt.
- Accepting a large rewrite without reviewing the diff.
- Copying code without understanding it.
- Trusting invented package names, APIs or outdated advice.
- Treating generated tests as proof of correctness.
- Ignoring type errors, warnings or failing tests.
- Skipping authorization, input validation or secret-handling checks.
- Pasting credentials or sensitive production data into unapproved tools.
- Allowing the assistant to change unrelated files without a reason.
- Claiming a feature works without running it.

## AI usage principle
**AI is the co-pilot; the intern is the engineer.** Interns are responsible for the correctness, security, testability and maintainability of every change they submit.

---

# Assessment & Evaluation Framework

Recommended assessment weights:

| Area | Weight | Evidence |
|---|---:|---|
| Engineering foundations and code comprehension | 15% | TypeScript, async behavior, debugging and explanation |
| Backend and data engineering | 15% | NestJS architecture, MongoDB model, validation, authorization and tests |
| Angular implementation | 10% | Functional client, reusable components, API integration and tests |
| React implementation | 10% | Functional client, state/effects, API integration and tests |
| Mobile implementation | 10% | Expo app, navigation, API integration and device behavior |
| Quality engineering and security | 15% | Risk-based tests, regression coverage, secure defaults and CI |
| AI-assisted workflow and verification | 10% | Task decomposition, diff review, verification and transparent use |
| Teamwork, delivery and documentation | 5% | Pull requests, collaboration, reproducible setup and documentation |
| Capstone outcome and demonstration | 10% | Integrated product, deployment, demo and explanation of trade-offs |
| **Total** | **100%** | |

## Assessment principles
- Assess working software and the intern's ability to explain it.
- Use practical tasks, code reviews and seeded defects—not only quizzes.
- Review tests for meaningful assertions, not just coverage numbers.
- Evaluate AI use by the quality of verification and engineering judgment.
- Require individual evidence even when the capstone is built in a team.
- Reward clear reasoning, security awareness, maintainability and collaboration.
- Do not reward code volume or prompt length by itself.

---

# Mentor & Delivery Checklist

- Keep a visible backlog with small tasks and clear acceptance criteria.
- Provide a starter repository and a consistent local development setup.
- Review at least one meaningful pull request per intern each week.
- Use code walkthroughs to verify understanding.
- Include negative test cases and seeded bugs.
- Give foundation exercises to interns who need extra support.
- Encourage early integration between backend and clients.
- Keep the capstone scope realistic for four weeks.
- Require setup instructions that work from a clean checkout.
- Track individual contributions and learning progress.
- Ensure AI use follows organizational privacy and security rules.

## Suggested daily rhythm
- 15–20 minutes: review previous learning and define the day's outcome.
- 45–60 minutes: concept walkthrough or instructor demonstration.
- 90–120 minutes: guided lab or project assignment.
- 20–30 minutes: peer review, debugging discussion or demo.
- End-of-day reflection: what was learned, what failed, what AI suggested and what was independently verified.

---

# Programme Completion Criteria

An intern successfully completes the programme when they can:

- Build and explain a modular NestJS backend and REST API.
- Model and persist data using MongoDB.
- Implement functional web workflows in Angular and React.
- Build a mobile app using React Native and Expo.
- Integrate clients with a shared backend.
- Write and run meaningful automated tests.
- Use Git branches, pull requests and code reviews.
- Configure CI and deploy an application.
- Use AI assistants iteratively, safely and critically.
- Explain the code they submit and justify key trade-offs.
- Present a working capstone with source code, documentation, tests and a deployment/demo.
- Identify known limitations honestly and describe the next steps.

**Programme message:** Learn. Build. Practice. Work on real projects.  
**Core principle:** AI is your co-pilot. You are the engineer.
