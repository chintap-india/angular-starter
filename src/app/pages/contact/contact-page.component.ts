import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { NetworkGraphComponent } from '../../shared/components/network-graph/network-graph.component';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContactDialogData } from '../../features/modals/contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    NetworkGraphComponent,
    ExploreNextComponent,
    ContactFormComponent
  ],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  initialData: ContactDialogData = {};

  ngOnInit(): void {
    this.seo.setSeoData({
      title: "Let's Talk | Contact Chintap — Share Your Ideas & Inquiries",
      description: "Every interesting thing starts somewhere. Bring us a problem, an idea, or a question you've been thinking about. We'll take it from there.",
      url: '/contact'
    });

    const qp = this.route.snapshot.queryParams;
    if (qp && (qp['intent'] || qp['route'] || qp['message'] || qp['email'] || qp['name'])) {
      const rawIntent = (qp['intent'] || '').toLowerCase();
      const brokenRoute = qp['route'] || '';
      const intentVal = rawIntent === 'cohort' ? 'academy' : (rawIntent || (brokenRoute ? 'issue' : 'problem'));
      const emailVal = qp['email'] || '';
      const nameVal = qp['name'] || (brokenRoute ? 'Chintap Visitor' : '');
      let messageVal = qp['message'] || '';
      if (!messageVal && brokenRoute) {
        messageVal = `Reporting broken or missing route: ${brokenRoute}`;
      } else if (!messageVal && (intentVal === 'academy' || rawIntent === 'cohort')) {
        messageVal = 'Hi Chintap team, I would like to inquire about the upcoming Full-Stack & Mobile App Development Cohort (curriculum, schedule, and admissions).';
      }

      this.initialData = {
        intent: intentVal,
        email: emailVal,
        name: nameVal,
        message: messageVal
      };
    }
  }

  async copyEmail(email: string): Promise<void> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        this.snackBar.open(`Copied ${email} to clipboard`, 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    } catch (err) {
      console.warn('Clipboard write error:', err);
    }
  }
}
