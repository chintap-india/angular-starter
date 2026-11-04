import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GraphInspectionDialogComponent, GraphInspectionData } from './graph-inspection-dialog.component';

describe('GraphInspectionDialogComponent', () => {
  let component: GraphInspectionDialogComponent;
  let fixture: ComponentFixture<GraphInspectionDialogComponent>;

  const mockDialogRef = {
    close: vi.fn()
  };

  const mockData: GraphInspectionData = {
    mode: 'home',
    title: 'Things. Apps. Possibilities.',
    subtitle: 'Physical hardware, purposeful software, and connected possibilities',
    excerpt: 'Some ideas take shape in the physical world. Others live on a screen. Some bring the two together in ways you hadn\'t considered before.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphInspectionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphInspectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create graph inspection dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, subtitle, and excerpt', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Things. Apps. Possibilities.');
    expect(el.textContent).toContain('Physical hardware, purposeful software, and connected possibilities');
    expect(el.textContent).toContain('Some ideas take shape in the physical world.');
  });

  it('should handle zoom in, zoom out, and reset', () => {
    expect(component.currentZoom).toBe(1.0);
    expect(component.zoomPercentage).toBe('100%');

    component.zoomIn();
    expect(component.currentZoom).toBe(1.25);
    expect(component.zoomPercentage).toBe('125%');

    component.zoomIn();
    expect(component.currentZoom).toBe(1.5);
    expect(component.zoomPercentage).toBe('150%');

    component.zoomOut();
    expect(component.currentZoom).toBe(1.25);

    component.resetZoom();
    expect(component.currentZoom).toBe(1.0);
    expect(component.zoomPercentage).toBe('100%');
    expect(component.panX()).toBe(0);
    expect(component.panY()).toBe(0);
  });

  it('should handle wheel zoom smoothly within bounds', () => {
    const mockPreventDefault = vi.fn();
    const zoomInEvent = {
      deltaY: -100,
      preventDefault: mockPreventDefault
    } as unknown as WheelEvent;

    component.onWheel(zoomInEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(component.currentZoom).toBe(1.15);

    const zoomOutEvent = {
      deltaY: 100,
      preventDefault: mockPreventDefault
    } as unknown as WheelEvent;

    component.onWheel(zoomOutEvent);
    expect(component.currentZoom).toBe(1.0);
  });

  it('should handle pointer drag to pan graph view', () => {
    const mockTarget = {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn()
    };

    const downEvent = {
      button: 0,
      clientX: 100,
      clientY: 100,
      pointerId: 1,
      target: mockTarget
    } as unknown as PointerEvent;

    component.onPointerDown(downEvent);

    const moveEvent = {
      pointerId: 1,
      clientX: 150,
      clientY: 130
    } as unknown as PointerEvent;

    component.onPointerMove(moveEvent);
    expect(component.isDragging()).toBe(true);
    expect(component.panX()).toBe(50);
    expect(component.panY()).toBe(30);

    const upEvent = {
      pointerId: 1,
      target: mockTarget
    } as unknown as PointerEvent;

    component.onPointerUp(upEvent);
    expect(component.isDragging()).toBe(false);
  });

  it('should close dialog when dialogRef.close is called', () => {
    component.dialogRef.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
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
});
