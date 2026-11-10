import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { BlogPost } from '../../core/models/blog.model';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MarkdownPipe,
  ],
  templateUrl: './blog-detail-page.component.html',
})
export class BlogDetailPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogService = inject(BlogService);
  private readonly seoService = inject(SeoService);
  private readonly snackBar = inject(MatSnackBar);

  readonly post = signal<BlogPost | null>(null);
  readonly loading = signal<boolean>(true);
  readonly adjacentPosts = signal<{ prev?: BlogPost; next?: BlogPost }>({});

  private routeSub?: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      } else {
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private async loadPost(slug: string): Promise<void> {
    this.loading.set(true);
    const found = await this.blogService.getPostBySlug(slug);

    if (found) {
      this.post.set(found);
      this.adjacentPosts.set(this.blogService.getAdjacentPosts(slug));
      this.applySeo(found);
    } else {
      this.post.set(null);
      this.seoService.setSeoData({
        title: 'Article Not Found',
        description: 'The requested blog post could not be found.',
        url: `/blogs/${slug}`,
        robots: 'noindex, follow',
      });
    }

    this.loading.set(false);
  }

  private applySeo(post: BlogPost): void {
    this.seoService.setSeoData({
      title: post.title,
      description: post.summary,
      url: `/blogs/${post.slug}`,
      image: post.coverImage,
      type: 'article',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blogs/${post.slug}` },
      ],
      customSchema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.summary,
        'datePublished': post.date,
        'dateModified': post.date,
        'author': {
          '@type': 'Person',
          'name': post.author,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Chintap',
          'url': 'https://chintap.com',
        },
      },
    });
  }

  async copyShareLink(): Promise<void> {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.snackBar.open('Article link copied to clipboard', 'Dismiss', { duration: 3000 });
      } catch {
        this.snackBar.open('Could not copy link', 'Dismiss', { duration: 3000 });
      }
    }
  }
}
