import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JournalArticle } from '../../../core/models/chintap.models';

@Component({
  selector: 'app-journal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './journal-dialog.component.html'
})
export class JournalDialogComponent {
  readonly article: JournalArticle = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<JournalDialogComponent>);
}
