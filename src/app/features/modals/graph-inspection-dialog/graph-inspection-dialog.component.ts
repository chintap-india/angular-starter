import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NetworkGraphComponent, NetworkGraphMode } from '../../../shared/components/network-graph/network-graph.component';

export interface GraphInspectionData {
  mode: NetworkGraphMode;
  title: string;
  subtitle: string;
  excerpt: string;
}

@Component({
  selector: 'app-graph-inspection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NetworkGraphComponent
  ],
  templateUrl: './graph-inspection-dialog.component.html'
})
export class GraphInspectionDialogComponent {
  readonly data: GraphInspectionData = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<GraphInspectionDialogComponent>);

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

  zoomIn(): void {
    this.zoomLevel.update(z => Math.min(2.5, Math.round((z + 0.25) * 100) / 100));
  }

  zoomOut(): void {
    this.zoomLevel.update(z => Math.max(0.5, Math.round((z - 0.25) * 100) / 100));
  }

  resetZoom(): void {
    this.zoomLevel.set(1.0);
    this.panX.set(0);
    this.panY.set(0);
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const step = event.deltaY < 0 ? 0.15 : -0.15;
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
    // Prevent browser pull-to-refresh on mobile swipe
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
