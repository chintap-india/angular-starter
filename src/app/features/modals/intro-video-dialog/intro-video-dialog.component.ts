import {
  Component,
  inject,
  signal,
  computed,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-intro-video-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './intro-video-dialog.component.html'
})
export class IntroVideoDialogComponent implements AfterViewInit, OnDestroy {
  readonly dialogRef = inject(MatDialogRef<IntroVideoDialogComponent>);
  private readonly router = inject(Router);

  @ViewChild('videoPlayer') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') containerRef?: ElementRef<HTMLDivElement>;

  readonly isPlaying = signal<boolean>(false);
  readonly isMuted = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(20);
  readonly hasEnded = signal<boolean>(false);
  readonly isBuffering = signal<boolean>(false);

  readonly progressPercent = computed(() => {
    const dur = this.duration();
    if (!dur || dur <= 0) return 0;
    return Math.min(100, Math.max(0, (this.currentTime() / dur) * 100));
  });

  readonly timeDisplay = computed(() => {
    const cur = Math.floor(this.currentTime());
    const dur = Math.floor(this.duration());
    const format = (s: number) => {
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    return `${format(cur)} / ${format(dur)}`;
  });

  ngAfterViewInit(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    // Attempt autoplay once dialog opens
    video.play().then(() => {
      this.isPlaying.set(true);
    }).catch(() => {
      // Browser autoplay policy blocked unmuted playback; try muted
      video.muted = true;
      this.isMuted.set(true);
      video.play().then(() => {
        this.isPlaying.set(true);
      }).catch(() => {
        this.isPlaying.set(false);
      });
    });
  }

  ngOnDestroy(): void {
    const video = this.videoRef?.nativeElement;
    if (video) {
      video.pause();
      video.src = '';
      video.load();
    }
  }

  togglePlay(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    if (this.hasEnded()) {
      video.currentTime = 0;
      this.hasEnded.set(false);
      video.play();
      this.isPlaying.set(true);
      return;
    }

    if (video.paused) {
      video.play();
      this.isPlaying.set(true);
    } else {
      video.pause();
      this.isPlaying.set(false);
    }
  }

  toggleMute(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    video.muted = !video.muted;
    this.isMuted.set(video.muted);
  }

  onTimeUpdate(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    this.currentTime.set(video.currentTime);
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      this.duration.set(video.duration);
    }
  }

  onLoadedMetadata(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    if (video.duration && !isNaN(video.duration)) {
      this.duration.set(video.duration);
    }
  }

  onEnded(): void {
    this.isPlaying.set(false);
    this.hasEnded.set(true);
  }

  onSeek(event: MouseEvent): void {
    const video = this.videoRef?.nativeElement;
    const target = event.currentTarget as HTMLElement;
    if (!video || !target) return;

    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * (video.duration || 20);
    video.currentTime = newTime;
    this.currentTime.set(newTime);
    this.hasEnded.set(false);
  }

  toggleFullscreen(): void {
    const container = this.containerRef?.nativeElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  navigateAndClose(route: string): void {
    this.dialogRef.close();
    this.router.navigate([route]);
  }

  close(): void {
    this.dialogRef.close();
  }
}
