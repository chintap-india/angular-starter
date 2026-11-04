import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="inline-flex items-center justify-center shrink-0"
      [ngClass]="[containerClass, sizeClasses]"
      [title]="name || nameKey"
      role="img"
      [attr.aria-label]="name || nameKey"
    >
      <img
        [src]="'/images/tech/' + resolvedFile"
        [alt]="name || nameKey"
        class="w-full h-full object-contain"
        [ngClass]="{'dark:invert': isMonochrome}"
        loading="lazy"
      />
    </div>
  `
})
export class TechLogoComponent {
  @Input() nameKey = '';
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() containerClass = '';

  get resolvedFile(): string {
    const k = (this.nameKey || '').toLowerCase().trim();
    if (k === 'reactnative') return 'react.svg';
    if (k === 'testing' || k === 'devops' || k === 'gear') return 'devops.svg';
    if (k === 'ai' || k === 'sparkle') return 'ai-sparkle.svg';
    return `${k}.svg`;
  }

  get isMonochrome(): boolean {
    const k = (this.nameKey || '').toLowerCase().trim();
    return k === 'expo' || k === 'github' || k === 'devops' || k === 'testing' || k === 'gear';
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'w-6 h-6';
      case 'lg':
        return 'w-10 h-10 sm:w-11 sm:h-11';
      case 'xl':
        return 'w-14 h-14';
      case 'md':
      default:
        return 'w-8 h-8';
    }
  }
}
