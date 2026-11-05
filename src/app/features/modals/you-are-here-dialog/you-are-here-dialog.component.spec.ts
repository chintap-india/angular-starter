import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@angular/compiler';
import { Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import {
  YouAreHereDialogComponent,
  SITE_CONSTELLATION_NODES,
  MOBILE_CONSTELLATION_NODES
} from './you-are-here-dialog.component';

describe('YouAreHereDialogComponent', () => {
  let component: YouAreHereDialogComponent;
  let mockRouter: { url: string; navigateByUrl: ReturnType<typeof vi.fn> };
  let mockDialogRef: { close: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRouter = {
      url: '/',
      navigateByUrl: vi.fn().mockResolvedValue(true)
    };
    mockDialogRef = {
      close: vi.fn()
    };

    const injector = Injector.create({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    });

    component = runInInjectionContext(injector, () => new YouAreHereDialogComponent());
  });

  it('should create you-are-here dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should detect active page as home by default on root url', () => {
    expect(component.activePageId()).toBe('home');
    expect(component.isExpanded('home')).toBe(true);
    expect(component.isCurrentLocation()).toBe(true);
  });

  it('should toggle expansion of page nodes', () => {
    expect(component.isExpanded('best-practices')).toBe(false);

    component.toggleNode('best-practices');
    expect(component.isExpanded('best-practices')).toBe(true);
    expect(component.selectedNodeId()).toBe('best-practices');

    component.toggleNode('best-practices');
    expect(component.isExpanded('best-practices')).toBe(false);
  });

  it('should select child section node', () => {
    component.selectChild('bp-c1', 'best-practices');
    expect(component.selectedNodeId()).toBe('best-practices');
    expect(component.selectedChildId()).toBe('bp-c1');
  });

  it('should navigate to selected page, close dialog with navigated: true, and scroll to top', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const focusMock = vi.fn();
    const getElementSpy = vi.spyOn(document, 'getElementById').mockReturnValue({ focus: focusMock } as any);

    component.selectedNodeId.set('best-practices');
    component.navigateToSelected();

    expect(mockDialogRef.close).toHaveBeenCalledWith({ navigated: true });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/best-practices');
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });

    scrollToSpy.mockRestore();
    getElementSpy.mockRestore();
  });

  it('should handle zoom and pan interactions', () => {
    expect(component.currentZoom).toBe(1.0);
    expect(component.zoomPercentage).toBe('100%');

    component.zoomIn();
    expect(component.currentZoom).toBe(1.2);

    component.zoomOut();
    expect(component.currentZoom).toBe(1.0);

    component.resetZoom();
    expect(component.currentZoom).toBe(1.0);
    expect(component.panX()).toBe(0);
    expect(component.panY()).toBe(0);
  });

  it('should handle multi-touch pinch to zoom and prevent page pull-to-refresh', () => {
    const preventDefaultSpy = vi.fn();
    const touchStartEvent = {
      preventDefault: preventDefaultSpy,
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 100 }
      ]
    } as unknown as TouchEvent;

    component.onTouchStart(touchStartEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();

    const touchMoveEvent = {
      preventDefault: preventDefaultSpy,
      touches: [
        { clientX: 50, clientY: 100 },
        { clientX: 250, clientY: 100 }
      ]
    } as unknown as TouchEvent;

    component.onTouchMove(touchMoveEvent);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(2);
    expect(component.currentZoom).toBeGreaterThan(1.0);

    const touchEndEvent = {
      touches: []
    } as unknown as TouchEvent;

    component.onTouchEnd(touchEndEvent);
    expect(component.isDragging()).toBe(false);
  });

  it('should handle multi-pointer pinch zoom', () => {
    const mockTarget = { setPointerCapture: vi.fn(), releasePointerCapture: vi.fn() };
    component.onPointerDown({ pointerId: 1, clientX: 100, clientY: 100, target: mockTarget } as unknown as PointerEvent);
    component.onPointerDown({ pointerId: 2, clientX: 200, clientY: 100, target: mockTarget } as unknown as PointerEvent);

    component.onPointerMove({ pointerId: 2, clientX: 250, clientY: 100 } as unknown as PointerEvent);
    expect(component.currentZoom).toBeGreaterThan(1.0);

    component.onPointerUp({ pointerId: 1, target: mockTarget } as unknown as PointerEvent);
    component.onPointerUp({ pointerId: 2, target: mockTarget } as unknown as PointerEvent);
    expect(component.isDragging()).toBe(false);
  });

  it('should initialize at 50% zoom and use reduced edge lengths in mobile mode', () => {
    component.setIsMobile(true);
    expect(component.currentZoom).toBe(0.5);
    expect(component.zoomPercentage).toBe('50%');

    // Verify first-level edges are reduced towards center (450, 350)
    const mobileNodes = component.allNodes;
    const aboutNode = mobileNodes.find(n => n.id === 'about')!;
    const featuresNode = mobileNodes.find(n => n.id === 'features')!;
    // Desktop about was x: 190; on mobile with reduced edge length it is ~242
    expect(aboutNode.x).toBeGreaterThan(180);
    // Desktop features was x: 710; on mobile with reduced edge length it is ~658
    expect(featuresNode.x).toBeLessThan(710);

    // Verify orbital rings are scaled down proportionally
    expect(component.outerOrbitalRadius.rx).toBeLessThan(330);
    expect(component.innerOrbitalRadius.rx).toBeLessThan(220);

    // Resetting zoom on mobile should restore 50%
    component.zoomIn();
    expect(component.currentZoom).toBe(0.7);
    component.resetZoom();
    expect(component.currentZoom).toBe(0.5);
  });

  it('should prevent default and trigger export on context menu right-click', () => {
    const mockPreventDefault = vi.fn();
    const event = { preventDefault: mockPreventDefault } as unknown as MouseEvent;
    const exportSpy = vi.spyOn(component, 'exportAsImage').mockImplementation(() => {});

    component.onContextMenu(event);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(exportSpy).toHaveBeenCalled();
  });
});
