import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then(m => m.HomePageComponent),
    title: 'Chintap Angular Starter | SEO, AEO, LLMO, GEO & SSR Ready Starter Kit',
  },
  {
    path: 'features',
    loadComponent: () =>
      import('./pages/features/features-page.component').then(m => m.FeaturesPageComponent),
    title: 'Features & Architecture | Chintap Angular Starter',
  },
  {
    path: 'best-practices',
    loadComponent: () =>
      import('./pages/best-practices/best-practices-page.component').then(
        m => m.BestPracticesPageComponent
      ),
    title: 'SEO, AEO, LLMO, GEO & SSR Best Practices Guide | Chintap Angular Starter',
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks-page.component').then(m => m.TasksPageComponent),
    title: 'Tasks CRUD Module — Typed Forms & Mock API | Chintap Angular Starter',
  },
  {
    path: 'todos',
    redirectTo: 'tasks',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About | Chintap Angular Starter',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: "Let's Talk | Contact Chintap Angular Starter",
  },
  // Legacy redirects to maintain compatibility
  {
    path: 'what-we-do',
    redirectTo: 'features',
  },
  {
    path: 'explorations',
    redirectTo: 'best-practices',
  },
  {
    path: 'how-we-work',
    redirectTo: 'features',
  },
  {
    path: 'how-we-do',
    redirectTo: 'features',
  },
  {
    path: 'academy',
    redirectTo: 'features',
  },
  {
    path: 'academy/curriculum',
    redirectTo: 'features',
  },
  {
    path: 'building-teams',
    redirectTo: 'features',
  },
  {
    path: 'partners',
    redirectTo: 'about',
  },
  {
    path: 'customers',
    redirectTo: 'about',
  },
  {
    path: 'game',
    redirectTo: 'features',
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(m => m.NotFoundPageComponent),
    title: 'Page Not Found (404) | Chintap Angular Starter',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(m => m.NotFoundPageComponent),
    title: 'Page Not Found (404) | Chintap Angular Starter',
  },
];
