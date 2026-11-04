import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactFormComponent } from '../../../shared/components/contact-form/contact-form.component';

export interface ContactDialogData {
  intent?: string;
  source?: string;
  message?: string;
  name?: string;
  email?: string;
  organization?: string;
}

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ContactFormComponent
  ],
  templateUrl: './contact-dialog.component.html'
})
export class ContactDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ContactDialogComponent>);
  readonly data = inject<ContactDialogData | null>(MAT_DIALOG_DATA, { optional: true });
}
