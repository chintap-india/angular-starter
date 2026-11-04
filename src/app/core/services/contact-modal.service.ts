import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDialogComponent, ContactDialogData } from '../../features/modals/contact-dialog/contact-dialog.component';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  private readonly dialog = inject(MatDialog);

  open(data?: ContactDialogData): MatDialogRef<ContactDialogComponent> {
    return this.dialog.open(ContactDialogComponent, {
      data,
      panelClass: ['contact-modal-panel', 'p-0', 'bg-transparent', 'shadow-none', 'overflow-visible'],
      maxWidth: 'min(94vw, 580px)',
      width: '100%',
      autoFocus: false,
      restoreFocus: true
    });
  }
}
