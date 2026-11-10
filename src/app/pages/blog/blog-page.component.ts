import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { BlogPost } from '../../core/models/blog.model';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent implements OnInit {
  readonly blogService = inject(BlogService);
  private readonly seoService = inject(SeoService);

  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly categories = this.blogService.categories;
  readonly featuredPost = this.blogService.featuredPost;

  readonly filteredPosts = computed(() => {
    return this.blogService.filterPosts({
      category: this.selectedCategory(),
      searchQuery: this.searchQuery(),
    });
  });

  readonly isSearchingOrFiltered = computed(() => {
    return this.selectedCategory() !== 'All' || this.searchQuery().trim().length > 0;
  });

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Engineering & Architecture Blog',
      description: 'Insights on Angular 22 Signals, Static Site Generation (SSG), Answer Engine Optimization (AEO), and modern web performance architecture.',
      url: '/blog',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
      ],
    });
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  clearFilters(): void {
    this.selectedCategory.set('All');
    this.searchQuery.set('');
  }
}
