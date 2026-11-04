import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface LegalSection {
  heading?: string;
  text: string;
}

export interface LegalDialogData {
  title: string;
  lastUpdated?: string;
  sections?: LegalSection[];
  paragraphs?: string[];
}

@Component({
  selector: 'app-legal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './legal-dialog.component.html'
})
export class LegalDialogComponent {
  readonly data: LegalDialogData = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<LegalDialogComponent>);
}
