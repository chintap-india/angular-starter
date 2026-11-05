import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NetworkGraphComponent } from './network-graph.component';
import { GraphInspectionDialogComponent } from '../../../features/modals/graph-inspection-dialog/graph-inspection-dialog.component';

describe('NetworkGraphComponent', () => {
  let component: NetworkGraphComponent;
  let fixture: ComponentFixture<NetworkGraphComponent>;
  let dialog: MatDialog;
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkGraphComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkGraphComponent);
    component = fixture.componentInstance;
    openSpy = vi.spyOn((component as any).dialog, 'open').mockReturnValue({} as any);
    fixture.detectChanges();
  });

  it('should create network graph component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to home mode and render home SVG with starter kit architecture', () => {
    expect(component.mode).toBe('home');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('svg')).toBeTruthy();
    expect(compiled.textContent).toContain('Starter Architecture');
    expect(compiled.textContent).toContain('Features');
    expect(compiled.textContent).toContain('5 Pillars');
    expect(compiled.textContent).toContain('Tasks Demo');
    expect(compiled.textContent).toContain('Built for speed, accessibility, and AI discoverability');
    expect(compiled.textContent).toContain('Modern DX');
  });

  it('should render expand button when allowExpand is true and trigger dialog with tight modal configuration', async () => {
    expect(component.allowExpand).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    const expandBtn = compiled.querySelector('button[aria-label="View expanded diagram"]') as HTMLButtonElement;
    expect(expandBtn).toBeTruthy();

    await component.openExpandedView();
    expect(openSpy).toHaveBeenCalledWith(
      GraphInspectionDialogComponent,
      expect.objectContaining({
        panelClass: expect.arrayContaining(['graph-modal-panel']),
        data: expect.objectContaining({
          mode: 'home',
          title: 'Starter Architecture'
        })
      })
    );
  });

  it('should hide expand button when allowExpand is false', () => {
    fixture.componentRef.setInput('allowExpand', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const expandBtn = compiled.querySelector('button[aria-label="View expanded diagram"]');
    expect(expandBtn).toBeNull();
  });

  it('should select node and display interactive explanation pill', () => {
    component.selectNode('home-features');
    fixture.detectChanges();
    expect(component.selectedNode()).toBe('home-features');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular 22, Signals, Tailwind CSS 4, Vitest, Netlify Free Tier.');

    // Clicking again should toggle selection off
    component.selectNode('home-features');
    fixture.detectChanges();
    expect(component.selectedNode()).toBeNull();
  });

  it('should render home narrative section modes', () => {
    fixture.componentRef.setInput('mode', 'home-thing-app');
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('The Idea');
    expect(compiled.textContent).toContain('Physical Hardware');
    expect(compiled.textContent).toContain('Purposeful Software');

    fixture.componentRef.setInput('mode', 'home-what-could-it-be');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('What if?');
    expect(compiled.textContent).toContain('Why not?');
    expect(compiled.textContent).toContain('Hypothesis Testing');

    fixture.componentRef.setInput('mode', 'home-thinking');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Problem Framing');
    expect(compiled.textContent).toContain('Simplest Answer');

    fixture.componentRef.setInput('mode', 'home-begins');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Shared Inquiry');
    expect(compiled.textContent).toContain('Technical Craft');
  });

  it('should render building-teams mode SVG with authentic brief copy and MockWin', () => {
    fixture.componentRef.setInput('mode', 'building-teams');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('svg')).toBeTruthy();
    expect(compiled.textContent).toContain('Build Around the Work');
    expect(compiled.textContent).toContain('MockWin');
    expect(compiled.textContent).toContain('The Work');
    expect(compiled.textContent).toContain('Capabilities Needed');
    expect(compiled.textContent).toContain('People & Team');
  });

  it('should render what-we-do, how-we-work, explorations, partners, about, and contact modes', () => {
    fixture.componentRef.setInput('mode', 'what-we-do');
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Choose the Form');
    expect(compiled.textContent).toContain('What Makes');

    fixture.componentRef.setInput('mode', 'how-we-work');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('The Learning Loop');
    expect(compiled.textContent).toContain('The Right Thing');

    fixture.componentRef.setInput('mode', 'explorations');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Open Questions');
    expect(compiled.textContent).toContain('Growing together');

    fixture.componentRef.setInput('mode', 'partners');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Shared Possibilities');
    expect(compiled.textContent).toContain('Figcube');

    fixture.componentRef.setInput('mode', 'about');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No Single Box');
    expect(compiled.textContent).toContain('Explore & Make');
    expect(compiled.textContent).toContain('Work in Progress');

    fixture.componentRef.setInput('mode', 'contact');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('A Starting Point');
    expect(compiled.textContent).toContain('hello@chintap.com');
  });

  it('should render features, best-practices, and tasks modes with starter kit architecture', () => {
    fixture.componentRef.setInput('mode', 'features');
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Modern Stack');
    expect(compiled.textContent).toContain('Angular Signals');
    expect(compiled.textContent).toContain('Tailwind CSS 4');
    expect(compiled.textContent).toContain('Vitest Testing');

    fixture.componentRef.setInput('mode', 'best-practices');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('5 Pillars Framework');
    expect(compiled.textContent).toContain('SEO');
    expect(compiled.textContent).toContain('AEO');
    expect(compiled.textContent).toContain('LLMO');
    expect(compiled.textContent).toContain('GEO');
    expect(compiled.textContent).toContain('SSR / SSG');

    fixture.componentRef.setInput('mode', 'tasks');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task Architecture');
    expect(compiled.textContent).toContain('Reactive Forms');
    expect(compiled.textContent).toContain('Markdown Preview');
    expect(compiled.textContent).toContain('Mock API Service');
    expect(compiled.textContent).toContain('Local Storage');
  });
});
