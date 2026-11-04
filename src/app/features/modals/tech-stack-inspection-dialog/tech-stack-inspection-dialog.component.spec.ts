import { describe, it, expect, vi } from 'vitest';
import '@angular/compiler';
import { runInInjectionContext, createEnvironmentInjector } from '@angular/core';
import { TechStackInspectionDialogComponent } from './tech-stack-inspection-dialog.component';

describe('TechStackInspectionDialogComponent Zoom & Pan Logic', () => {
  const injector = createEnvironmentInjector([], null as any);

  const createComponent = () => {
    return runInInjectionContext(injector, () => new TechStackInspectionDialogComponent());
  };

  it('should initialize with default zoom 1.0', () => {
    const comp = createComponent();
    expect(comp.currentZoom).toBe(1.0);
    expect(comp.zoomPercentage).toBe('100%');
  });

  it('should zoom in and zoom out within safe bounds', () => {
    const comp = createComponent();
    comp.zoomIn();
    expect(comp.currentZoom).toBe(1.2);
    expect(comp.zoomPercentage).toBe('120%');

    comp.zoomOut();
    expect(comp.currentZoom).toBe(1.0);

    comp.resetZoom();
    expect(comp.currentZoom).toBe(1.0);
    expect(comp.panX()).toBe(0);
    expect(comp.panY()).toBe(0);
  });

  it('should handle wheel zoom smoothly', () => {
    const comp = createComponent();
    const mockPreventDefault = vi.fn();
    const zoomInEvent = {
      deltaY: -100,
      preventDefault: mockPreventDefault
    } as unknown as WheelEvent;

    comp.onWheel(zoomInEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(comp.currentZoom).toBe(1.12);
  });

  it('should call dialogRef.close when closeDialog is executed', () => {
    const comp = createComponent();
    const mockDialogRef = { close: vi.fn() };
    Object.defineProperty(comp, 'dialogRef', { value: mockDialogRef });

    comp.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
