import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

export interface ChildSectionNode {
  id: string;
  label: string;
  sublabel: string;
  dx: number;
  dy: number;
}

export interface ConstellationPageNode {
  id: string;
  title: string;
  tagline: string;
  route: string;
  description: string;
  x: number;
  y: number;
  labelOffset: { x: number; y: number; anchor: 'start' | 'middle' | 'end' };
  children: ChildSectionNode[];
}

export const SITE_CONSTELLATION_NODES: ConstellationPageNode[] = [
  {
    id: 'home',
    title: 'Home',
    tagline: '5 Pillars & Architecture Overview',
    route: '/',
    description: 'Production-ready Angular starter kit equipped with out-of-the-box best practices for the AI search and generative answer era.',
    x: 450,
    y: 150,
    labelOffset: { x: 0, y: -24, anchor: 'middle' },
    children: [
      { id: 'home-c1', label: '01 Five Pillars', sublabel: 'SEO, AEO, LLMO, GEO, SSR', dx: -75, dy: -50 },
      { id: 'home-c2', label: '02 Quickstart', sublabel: 'Setup & clone in seconds', dx: -25, dy: -75 },
      { id: 'home-c3', label: '03 Schema FAQPage', sublabel: 'AI Overviews & Perplexity', dx: 30, dy: -75 },
      { id: 'home-c4', label: '04 Zero Hardcoding', sublabel: 'Decoupled content token', dx: 80, dy: -50 }
    ]
  },
  {
    id: 'features',
    title: 'Features',
    tagline: 'Modern Stack & Architecture',
    route: '/features',
    description: 'Angular 22 Signals, TypeScript 5.8 strict mode, Tailwind CSS 4, Material 3, and Vitest test runner.',
    x: 710,
    y: 250,
    labelOffset: { x: 18, y: -6, anchor: 'start' },
    children: [
      { id: 'feat-c1', label: '01 Angular Signals', sublabel: 'Zoneless reactive state', dx: 65, dy: -45 },
      { id: 'feat-c2', label: '02 TypeScript 5.8', sublabel: 'Strict compile checking', dx: 85, dy: 5 },
      { id: 'feat-c3', label: '03 Tailwind 4 & M3', sublabel: 'Design tokens & themes', dx: 70, dy: 50 },
      { id: 'feat-c4', label: '04 Vitest Runner', sublabel: 'Sub-2s test execution', dx: 40, dy: 80 }
    ]
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    tagline: 'Engineering & Search Guides',
    route: '/best-practices',
    description: 'Comprehensive implementation standards for traditional search, answer engines, LLM manifests, and Core Web Vitals.',
    x: 710,
    y: 450,
    labelOffset: { x: 18, y: 12, anchor: 'start' },
    children: [
      { id: 'bp-c1', label: '01 Traditional SEO', sublabel: 'Canonical URLs & OG tags', dx: 45, dy: -75 },
      { id: 'bp-c2', label: '02 Answer Engines', sublabel: '40–60w concise answers', dx: 80, dy: -30 },
      { id: 'bp-c3', label: '03 LLMO Manifests', sublabel: '/llms.txt & ard.json', dx: 80, dy: 25 },
      { id: 'bp-c4', label: '04 Core Web Vitals', sublabel: 'Sub-100ms FCP, zero CLS', dx: 50, dy: 70 }
    ]
  },
  {
    id: 'tasks',
    title: 'Tasks',
    tagline: 'Typed Forms & Mock API',
    route: '/tasks',
    description: 'Full CRUD operations module demonstrating typed reactive forms, markdown live preview, and local-first persistence.',
    x: 450,
    y: 550,
    labelOffset: { x: 0, y: 26, anchor: 'middle' },
    children: []
  },
  {
    id: 'about',
    title: 'About',
    tagline: 'Ethos & Free-Tier Standards',
    route: '/about',
    description: 'Built on open-source principles with 100% free-tier architecture—zero subscriptions, zero paid add-ons, zero vendor lock-in.',
    x: 190,
    y: 450,
    labelOffset: { x: -18, y: 12, anchor: 'end' },
    children: [
      { id: 'abt-c1', label: '01 100% Free-Tier', sublabel: 'Zero subscriptions or fees', dx: -50, dy: 70 },
      { id: 'abt-c2', label: '02 Open Standards', sublabel: 'Clean MIT architecture', dx: -80, dy: 25 },
      { id: 'abt-c3', label: '03 Developer First', sublabel: 'Clarity over complexity', dx: -80, dy: -30 },
      { id: 'abt-c4', label: '04 Chintap', sublabel: 'Things, Apps, Possibilities', dx: -45, dy: -75 }
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    tagline: "Let's Talk & Collaborate",
    route: '/contact',
    description: 'Get in touch for developer support, starter kit feedback, suggestions, or technical collaboration.',
    x: 190,
    y: 250,
    labelOffset: { x: -18, y: -6, anchor: 'end' },
    children: [
      { id: 'cnt-c1', label: '01 Developer Support', sublabel: 'Direct guidance & answers', dx: -40, dy: 80 },
      { id: 'cnt-c2', label: '02 Community Feedback', sublabel: 'Issues & feature requests', dx: -70, dy: 50 },
      { id: 'cnt-c3', label: '03 Netlify Forms', sublabel: 'Headless static handling', dx: -85, dy: 5 },
      { id: 'cnt-c4', label: '04 Collaboration', sublabel: 'Contribute on GitHub', dx: -65, dy: -45 }
    ]
  }
];

function buildMobileNodes(nodes: ConstellationPageNode[], edgeScale = 0.80): ConstellationPageNode[] {
  const cx = 450;
  const cy = 350;
  return nodes.map(node => {
    const dx = node.x - cx;
    const dy = node.y - cy;
    return {
      ...node,
      x: Math.round(cx + dx * edgeScale),
      y: Math.round(cy + dy * edgeScale),
      children: node.children.map(child => ({
        ...child,
        dx: Math.round(child.dx * 0.88),
        dy: Math.round(child.dy * 0.88)
      }))
    };
  });
}

export const MOBILE_CONSTELLATION_NODES: ConstellationPageNode[] = buildMobileNodes(SITE_CONSTELLATION_NODES, 0.80);

@Component({
  selector: 'app-you-are-here-dialog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './you-are-here-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YouAreHereDialogComponent {
  readonly dialogRef = inject(MatDialogRef<YouAreHereDialogComponent>);
  private readonly router = inject(Router);

  readonly isMobile = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const mobile = window.innerWidth < 640;
      this.isMobile.set(mobile);
      if (mobile) {
        this.zoomLevel.set(0.5);
      }
    }
  }

  setIsMobile(mobile: boolean): void {
    this.isMobile.set(mobile);
    if (mobile) {
      this.zoomLevel.set(0.5);
    } else {
      this.zoomLevel.set(1.0);
    }
  }

  get allNodes(): ConstellationPageNode[] {
    return this.isMobile() ? MOBILE_CONSTELLATION_NODES : SITE_CONSTELLATION_NODES;
  }

  get outerOrbitalRadius(): { rx: number; ry: number } {
    return this.isMobile() ? { rx: 240, ry: 160 } : { rx: 300, ry: 200 };
  }

  get innerOrbitalRadius(): { rx: number; ry: number } {
    return this.isMobile() ? { rx: 150, ry: 100 } : { rx: 190, ry: 125 };
  }

  // Detect current route to identify where user is
  readonly activePageId = computed<string>(() => {
    const url = this.router.url.split('?')[0].split('#')[0];
    if (url === '/' || url === '') return 'home';
    const clean = url.replace(/^\//, '');
    if (clean === 'todos') return 'tasks';
    const matched = this.allNodes.find(n => n.route === url || n.id === clean);
    return matched ? matched.id : 'home';
  });

  // Selected node for inspector
  readonly selectedNodeId = signal<string>(this.activePageId());

  // Set of expanded page nodes (start with active page expanded)
  readonly expandedNodes = signal<Set<string>>(new Set([this.activePageId()]));

  // Selected child node (if any)
  readonly selectedChildId = signal<string | null>(null);

  // Zoom & Pan state
  readonly zoomLevel = signal<number>(1.0);
  readonly panX = signal<number>(0);
  readonly panY = signal<number>(0);
  readonly isDragging = signal<boolean>(false);

  private dragStart = { x: 0, y: 0 };
  private initialPan = { x: 0, y: 0 };

  get currentZoom(): number {
    return this.zoomLevel();
  }

  get zoomPercentage(): string {
    return `${Math.round(this.zoomLevel() * 100)}%`;
  }

  readonly selectedPageNode = computed<ConstellationPageNode>(() => {
    const id = this.selectedNodeId();
    return this.allNodes.find(n => n.id === id) || this.allNodes[0];
  });

  readonly isCurrentLocation = computed<boolean>(() => {
    return this.selectedNodeId() === this.activePageId();
  });

  isExpanded(nodeId: string): boolean {
    return this.expandedNodes().has(nodeId);
  }

  toggleNode(nodeId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedNodeId.set(nodeId);
    this.selectedChildId.set(null);

    this.expandedNodes.update(set => {
      const next = new Set(set);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }

  selectChild(childId: string, pageId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedNodeId.set(pageId);
    this.selectedChildId.set(childId);
  }

  navigateToRoute(route: string): void {
    this.dialogRef.close({ navigated: true });

    const scrollToTop = (): void => {
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        const prevBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        root.style.scrollBehavior = prevBehavior;

        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus({ preventScroll: true });
        }
      }
    };

    // Scroll immediately to top
    scrollToTop();

    if (this.router.url !== route) {
      this.router.navigateByUrl(route).then(() => {
        scrollToTop();
        setTimeout(scrollToTop, 50);
        setTimeout(scrollToTop, 150);
      });
    } else {
      setTimeout(scrollToTop, 50);
    }
  }

  navigateToSelected(): void {
    const page = this.selectedPageNode();
    this.navigateToRoute(page.route);
  }

  zoomIn(): void {
    this.zoomLevel.update(z => Math.min(2.5, Math.round((z + 0.2) * 100) / 100));
  }

  zoomOut(): void {
    this.zoomLevel.update(z => Math.max(0.5, Math.round((z - 0.2) * 100) / 100));
  }

  resetZoom(): void {
    const defaultZoom = this.isMobile() ? 0.5 : 1.0;
    this.zoomLevel.set(defaultZoom);
    this.panX.set(0);
    this.panY.set(0);
  }

  readonly isExporting = signal<boolean>(false);

  exportAsImage(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const svg = document.querySelector('.network-graph-svg') as SVGSVGElement | null;
    if (!svg) return;

    this.isExporting.set(true);

    try {
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', '900');
      clone.setAttribute('height', '650');

      // Transfer computed styles so external CSS classes render in isolated SVG image
      const srcEls = svg.querySelectorAll('*');
      const cloneEls = clone.querySelectorAll('*');
      for (let i = 0; i < srcEls.length; i++) {
        const src = srcEls[i];
        const dest = cloneEls[i];
        if (src instanceof SVGElement && dest instanceof SVGElement && typeof window.getComputedStyle === 'function') {
          const comp = window.getComputedStyle(src);
          if (comp.fill && comp.fill !== 'none') dest.setAttribute('fill', comp.fill);
          if (comp.stroke && comp.stroke !== 'none') dest.setAttribute('stroke', comp.stroke);
          if (comp.strokeWidth) dest.setAttribute('stroke-width', comp.strokeWidth);
          if (comp.strokeDasharray && comp.strokeDasharray !== 'none') dest.setAttribute('stroke-dasharray', comp.strokeDasharray);
          if (comp.opacity && comp.opacity !== '1') dest.setAttribute('opacity', comp.opacity);
          if (comp.fontFamily) dest.setAttribute('font-family', comp.fontFamily);
          if (comp.fontSize) dest.setAttribute('font-size', comp.fontSize);
          if (comp.fontWeight) dest.setAttribute('font-weight', comp.fontWeight);
        }
      }

      const isDark = document.documentElement.classList.contains('dark');
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(clone);
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const URLObj = window.URL || (window as unknown as { webkitURL: typeof URL }).webkitURL || URL;
      const url = URLObj.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        try {
          const scale = 2; // Crisp 2x retina export
          const canvas = document.createElement('canvas');
          canvas.width = 900 * scale;
          canvas.height = 650 * scale;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = isDark ? '#0c0a09' : '#fafaf9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const a = document.createElement('a');
            a.download = `chintap-constellation-${this.activePageId()}.png`;
            a.href = canvas.toDataURL('image/png');
            a.click();
          }
        } finally {
          URLObj.revokeObjectURL(url);
          this.isExporting.set(false);
        }
      };
      img.onerror = () => {
        URLObj.revokeObjectURL(url);
        this.isExporting.set(false);
      };
      img.src = url;
    } catch {
      this.isExporting.set(false);
    }
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.exportAsImage();
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const step = event.deltaY < 0 ? 0.12 : -0.12;
    this.zoomLevel.update(z => {
      const next = Math.round((z + step) * 100) / 100;
      return Math.max(0.5, Math.min(2.5, next));
    });
  }

  private activePointers = new Map<number, { x: number; y: number }>();
  private initialPinchDistance = 0;
  private initialPinchZoom = 1.0;
  private dragThreshold = 4;
  private hasMovedBeyondThreshold = false;

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);

    if (this.activePointers.size === 1) {
      this.dragStart = { x: event.clientX, y: event.clientY };
      this.initialPan = { x: this.panX(), y: this.panY() };
      this.hasMovedBeyondThreshold = false;
    } else if (this.activePointers.size === 2) {
      const pts = Array.from(this.activePointers.values());
      this.initialPinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      this.initialPinchZoom = this.zoomLevel();
      this.isDragging.set(true);
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (this.activePointers.has(event.pointerId)) {
      this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (this.activePointers.size >= 2 && this.initialPinchDistance > 0) {
      const pts = Array.from(this.activePointers.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (currentDist > 0) {
        const factor = currentDist / this.initialPinchDistance;
        const next = Math.round(this.initialPinchZoom * factor * 100) / 100;
        this.zoomLevel.set(Math.max(0.5, Math.min(2.5, next)));
      }
    } else if (this.activePointers.size === 1) {
      const dx = event.clientX - this.dragStart.x;
      const dy = event.clientY - this.dragStart.y;
      if (!this.hasMovedBeyondThreshold && Math.hypot(dx, dy) > this.dragThreshold) {
        this.hasMovedBeyondThreshold = true;
        this.isDragging.set(true);
      }
      if (this.hasMovedBeyondThreshold) {
        this.panX.set(Math.round(this.initialPan.x + dx));
        this.panY.set(Math.round(this.initialPan.y + dy));
      }
    }
  }

  onPointerUp(event: PointerEvent): void {
    this.activePointers.delete(event.pointerId);
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);

    if (this.activePointers.size < 2) {
      this.initialPinchDistance = 0;
    }
    if (this.activePointers.size === 0) {
      this.isDragging.set(false);
      this.hasMovedBeyondThreshold = false;
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length >= 2) {
      event.preventDefault();
      const t1 = event.touches[0];
      const t2 = event.touches[1];
      this.initialPinchDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      this.initialPinchZoom = this.zoomLevel();
      this.isDragging.set(true);
    }
  }

  onTouchMove(event: TouchEvent): void {
    // Suppress browser pull-to-refresh on mobile touch drag
    event.preventDefault();

    if (event.touches.length >= 2 && this.initialPinchDistance > 0) {
      const t1 = event.touches[0];
      const t2 = event.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (dist > 0) {
        const factor = dist / this.initialPinchDistance;
        const next = Math.round(this.initialPinchZoom * factor * 100) / 100;
        this.zoomLevel.set(Math.max(0.5, Math.min(2.5, next)));
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (event.touches.length < 2) {
      this.initialPinchDistance = 0;
    }
    if (event.touches.length === 0) {
      this.isDragging.set(false);
      this.hasMovedBeyondThreshold = false;
    }
  }
}
