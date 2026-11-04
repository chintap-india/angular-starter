import { Component, Input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, PageKey, NextPathItem } from '../../../core/services/content.service';

@Component({
  selector: 'app-explore-next',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './explore-next.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreNextComponent {
  @Input({ required: true }) page: PageKey = 'home';
  @Input() variant: 'section' | 'contained' = 'contained';
  @Input() eyebrow = 'Where to next?';
  @Input() heading = 'Continue exploring';
  @Input() subtitle = 'Curious about where ideas go, how we work, or who we build with? Choose a path below.';

  private readonly contentService = inject(ContentService);

  get paths(): NextPathItem[] {
    return this.contentService.getNextPaths(this.page);
  }
}
