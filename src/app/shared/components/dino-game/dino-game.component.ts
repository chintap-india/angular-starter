import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../core/services/theme.service';

export type GameState = 'idle' | 'playing' | 'gameover' | 'paused';
export type ObstacleType = 'scope-creep' | 'half-baked' | 'meeting' | 'rabbit-hole';

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  label: string;
  frame: number;
  passed: boolean;
}

export interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  pulse: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
  color: string;
  size: number;
  text?: string;
}

@Component({
  selector: 'app-dino-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dino-game.component.html'
})
export class DinoGameComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly themeService = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  // Game signals
  readonly gameState = signal<GameState>('idle');
  readonly score = signal<number>(0);
  readonly highScore = signal<number>(0);
  readonly soundEnabled = signal<boolean>(true);
  readonly isDucking = signal<boolean>(false);
  readonly lastQuip = signal<string>('');
  readonly milestoneMessage = signal<string | null>(null);
  readonly isNewHighScore = signal<boolean>(false);
  readonly eurekasCollected = signal<number>(0);

  // Kid-friendly witty quips pool
  readonly wittyQuips: string[] = [
    'Whoops! Tripped over Scope Creep.',
    'Burnt by a Half-Baked Idea! Needs more sprinkles in the oven.',
    'Collided with a Flying Meeting! That could have been a high-five.',
    'Fell into a Rabbit Hole! Where do you think that tunnel leads?',
    '404: Coordinate uncharted, but a sensational workout for your chin!',
    'Overthought yourself into a wall! Take a breath, tap your chin, and try again.',
    'You wandered off the map! The good news: that is where great ideas hide.',
    'Feature creep won this round! Simpler is always more fun.'
  ];

  // Milestone announcements
  readonly milestoneTiers: Record<number, string> = {
    100: 'A promising hunch!',
    200: 'Turning the idea over...',
    300: 'Connecting the dots!',
    500: 'Breakthrough territory!',
    750: 'Pure serendipity unlocked!',
    1000: 'You escaped the 404 void!'
  };

  // Internal canvas dimensions (scaled up for high clarity & kids)
  readonly canvasWidth = 720;
  readonly canvasHeight = 280;
  readonly groundY = 226;

  // Dino physics state (floaty, forgiving & easy for kids)
  dinoX = 72;
  dinoY = 226;
  dinoVy = 0;
  dinoWidth = 50;
  dinoHeight = 58;
  readonly normalHeight = 58;
  readonly duckHeight = 34;
  readonly gravity = 0.34;      // Floaty, relaxed descent
  readonly jumpForce = -9.4;     // Smooth, high jump arc with plenty of hang-time
  isJumping = false;
  legPhase = 0;
  chinTapAngle = 0;

  // Kid-friendly gentle speed: Starts at 2.6, caps at 3.6
  readonly initialSpeed = 2.6;
  readonly maxSpeed = 3.6;
  gameSpeed = 2.6;
  groundOffset = 0;
  obstacles: Obstacle[] = [];
  collectibles: Collectible[] = [];
  particles: Particle[] = [];
  spawnTimer = 0;
  collectibleTimer = 0;

  // Animation frame & Audio
  private animationFrameId: number | null = null;
  private lastTimestamp = 0;
  private audioCtx: AudioContext | null = null;
  private keydownHandler?: (e: KeyboardEvent) => void;
  private keyupHandler?: (e: KeyboardEvent) => void;

  constructor() {
    // Re-render when theme changes
    effect(() => {
      this.themeService.isDark();
      if (this.gameState() === 'idle' || this.gameState() === 'gameover') {
        this.renderFrame();
      }
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Load high score and sound preference
    const savedHighScore = localStorage.getItem('chintap-dino-highscore');
    if (savedHighScore) {
      this.highScore.set(parseInt(savedHighScore, 10) || 0);
    }
    const savedSound = localStorage.getItem('chintap-dino-sound');
    if (savedSound !== null) {
      this.soundEnabled.set(savedSound === 'true');
    }

    this.setupKeyboardListeners();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initCanvasResolution();
    this.renderFrame();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (typeof window !== 'undefined') {
      if (this.keydownHandler) window.removeEventListener('keydown', this.keydownHandler);
      if (this.keyupHandler) window.removeEventListener('keyup', this.keyupHandler);
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {
        // Ignored
      }
    }
  }

  private initCanvasResolution(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.canvasWidth * dpr;
    canvas.height = this.canvasHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.scale(dpr, dpr);
    }
  }

  private setupKeyboardListeners(): void {
    this.keydownHandler = (e: KeyboardEvent) => {
      // Space, Up, or W to jump / start
      if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (this.gameState() === 'playing' || this.gameState() === 'idle' || this.gameState() === 'gameover') {
          e.preventDefault();
        }
        if (this.gameState() === 'idle' || this.gameState() === 'gameover') {
          this.startGame();
        } else if (this.gameState() === 'playing') {
          this.jump();
        }
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        if (this.gameState() === 'playing') {
          e.preventDefault();
          this.setDuck(true);
        }
      } else if (e.code === 'KeyP') {
        this.togglePause();
      }
    };

    this.keyupHandler = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        this.setDuck(false);
      }
    };

    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  // User Actions
  startGame(): void {
    this.initAudioContext();
    this.resetGameState();
    this.gameState.set('playing');
    this.playSound('jump');

    // Run animation outside Angular zone for high 60fps performance
    this.ngZone.runOutsideAngular(() => {
      this.lastTimestamp = performance.now();
      this.loop(this.lastTimestamp);
    });
  }

  restartGame(): void {
    this.startGame();
  }

  togglePause(): void {
    if (this.gameState() === 'playing') {
      this.gameState.set('paused');
    } else if (this.gameState() === 'paused') {
      this.gameState.set('playing');
      this.ngZone.runOutsideAngular(() => {
        this.lastTimestamp = performance.now();
        this.loop(this.lastTimestamp);
      });
    }
  }

  jump(): void {
    if (this.gameState() !== 'playing') {
      if (this.gameState() === 'idle' || this.gameState() === 'gameover') {
        this.startGame();
      }
      return;
    }
    if (!this.isJumping) {
      this.dinoVy = this.jumpForce;
      this.isJumping = true;
      this.createPuffParticles(this.dinoX + 22, this.groundY, 5);
      this.playSound('jump');
    }
  }

  setDuck(ducking: boolean): void {
    if (this.gameState() !== 'playing') return;
    this.isDucking.set(ducking);
    if (ducking) {
      this.dinoHeight = this.duckHeight;
      this.dinoWidth = 62;
      // Gentle drop if in air
      if (this.isJumping) {
        this.dinoVy += 2.5;
      }
    } else {
      this.dinoHeight = this.normalHeight;
      this.dinoWidth = 50;
    }
  }

  toggleSound(): void {
    const next = !this.soundEnabled();
    this.soundEnabled.set(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('chintap-dino-sound', String(next));
    }
    if (next) {
      this.initAudioContext();
      this.playSound('collect');
    }
  }

  private resetGameState(): void {
    this.score.set(0);
    this.isNewHighScore.set(false);
    this.eurekasCollected.set(0);
    this.milestoneMessage.set(null);
    this.dinoY = this.groundY - this.normalHeight;
    this.dinoVy = 0;
    this.dinoHeight = this.normalHeight;
    this.dinoWidth = 50;
    this.isJumping = false;
    this.isDucking.set(false);
    this.gameSpeed = this.initialSpeed;
    this.groundOffset = 0;
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.spawnTimer = 60;
    this.collectibleTimer = 140;
  }

  private triggerGameOver(): void {
    this.gameState.set('gameover');
    this.playSound('gameover');

    // Pick random witty quip
    const quip = this.wittyQuips[Math.floor(Math.random() * this.wittyQuips.length)];
    this.lastQuip.set(quip);

    // Check high score
    const currentScore = this.score();
    if (currentScore > this.highScore()) {
      this.highScore.set(currentScore);
      this.isNewHighScore.set(true);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('chintap-dino-highscore', currentScore.toString());
      }
    }

    // Explosion particles
    this.createPuffParticles(this.dinoX + 26, this.dinoY + 26, 18, '#ea1c24');
    this.renderFrame();
  }

  // Game Loop
  private loop(timestamp: number): void {
    if (this.gameState() !== 'playing') return;

    const dt = Math.min((timestamp - this.lastTimestamp) / 16.66, 2.5);
    this.lastTimestamp = timestamp;

    this.update(dt);
    this.renderFrame();

    this.animationFrameId = requestAnimationFrame(t => this.loop(t));
  }

  private update(dt: number): void {
    // 1. Update Score & Kid-Friendly Speed
    const currentScore = this.score() + 1;
    this.score.set(currentScore);

    // Very gentle speed ramp capped strictly at maxSpeed (3.6)
    if (currentScore % 150 === 0 && this.gameSpeed < this.maxSpeed) {
      this.gameSpeed = Math.min(this.maxSpeed, this.gameSpeed + 0.05);
    }

    // Milestones check
    if (this.milestoneTiers[currentScore]) {
      const msg = this.milestoneTiers[currentScore];
      this.milestoneMessage.set(msg);
      this.playSound('milestone');
      this.addFloatingText(this.dinoX + 50, this.dinoY - 24, msg, '#ea1c24');
      setTimeout(() => {
        if (this.milestoneMessage() === msg) {
          this.milestoneMessage.set(null);
        }
      }, 2500);
    }

    // 2. Update Dino Position (floaty physics)
    if (this.isJumping) {
      this.dinoY += this.dinoVy * dt;
      this.dinoVy += this.gravity * dt;

      if (this.dinoY >= this.groundY - this.dinoHeight) {
        this.dinoY = this.groundY - this.dinoHeight;
        this.dinoVy = 0;
        this.isJumping = false;
        this.createPuffParticles(this.dinoX + 22, this.groundY, 4);
      }
    } else {
      this.dinoY = this.groundY - this.dinoHeight;
    }

    // Leg animation
    this.legPhase += 0.16 * dt;
    this.chinTapAngle = Math.sin(this.legPhase * 1.4) * 0.25;

    // Ground scroll
    this.groundOffset = (this.groundOffset + this.gameSpeed * dt) % 28;

    // 3. Obstacle Spawning & Movement (generous gaps between obstacles)
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnObstacle();
      // Long, relaxed interval (plenty of reaction time for kids)
      this.spawnTimer = 110 + Math.random() * 90;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.x -= this.gameSpeed * dt;
      obs.frame += 0.08 * dt;

      // Check collision
      if (this.checkCollision(obs)) {
        this.ngZone.run(() => {
          this.triggerGameOver();
        });
        return;
      }

      // Remove offscreen
      if (obs.x + obs.width < -30) {
        this.obstacles.splice(i, 1);
      }
    }

    // 4. Collectibles Spawning & Movement (frequent rewards!)
    this.collectibleTimer -= dt;
    if (this.collectibleTimer <= 0) {
      this.spawnCollectible();
      this.collectibleTimer = 160 + Math.random() * 140;
    }

    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const c = this.collectibles[i];
      c.x -= this.gameSpeed * dt;
      c.pulse += 0.07 * dt;

      // Check pickup
      if (!c.collected && this.checkCollectiblePickup(c)) {
        c.collected = true;
        this.eurekasCollected.update(n => n + 1);
        this.score.update(s => s + 100);
        this.playSound('collect');

        const phrases = ['💡 +100 EUREKA!', '💡 +100 WHAT IF?', '💡 +100 CHIN TAP!'];
        const chosen = phrases[Math.floor(Math.random() * phrases.length)];
        this.addFloatingText(c.x, c.y - 12, chosen, '#eab308');
        this.createPuffParticles(c.x + 12, c.y + 12, 10, '#fde047');
      }

      if (c.x + c.width < -30 || c.collected) {
        this.collectibles.splice(i, 1);
      }
    }

    // 5. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / 28);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  private spawnObstacle(): void {
    const types: ObstacleType[] = ['scope-creep', 'half-baked', 'meeting', 'rabbit-hole'];
    // Flying meeting unlocked once score > 150
    const availableTypes = this.score() > 150 ? types : types.filter(t => t !== 'meeting');
    const selected = availableTypes[Math.floor(Math.random() * availableTypes.length)];

    let obs: Obstacle;
    if (selected === 'scope-creep') {
      obs = {
        x: this.canvasWidth + 30,
        y: this.groundY - 50,
        width: 44,
        height: 50,
        type: 'scope-creep',
        label: 'Scope Creep',
        frame: 0,
        passed: false
      };
    } else if (selected === 'half-baked') {
      obs = {
        x: this.canvasWidth + 30,
        y: this.groundY - 38,
        width: 42,
        height: 38,
        type: 'half-baked',
        label: 'Half-Baked',
        frame: 0,
        passed: false
      };
    } else if (selected === 'meeting') {
      // Flying obstacle: comfortably high so kids can duck easily or walk underneath
      const flyY = Math.random() > 0.5 ? this.groundY - 48 : this.groundY - 82;
      obs = {
        x: this.canvasWidth + 30,
        y: flyY,
        width: 46,
        height: 32,
        type: 'meeting',
        label: 'Endless Meeting',
        frame: 0,
        passed: false
      };
    } else {
      // Rabbit hole / Tangled cords
      obs = {
        x: this.canvasWidth + 30,
        y: this.groundY - 36,
        width: 42,
        height: 36,
        type: 'rabbit-hole',
        label: 'Rabbit Hole',
        frame: 0,
        passed: false
      };
    }

    this.obstacles.push(obs);
  }

  private spawnCollectible(): void {
    // Spawn floating Eureka lightbulb comfortably reachable via jump
    this.collectibles.push({
      x: this.canvasWidth + 40,
      y: this.groundY - 75 - Math.random() * 35,
      width: 26,
      height: 30,
      collected: false,
      pulse: 0
    });
  }

  private checkCollision(obs: Obstacle): boolean {
    // Extra generous hitbox padding for kids (forgiving near-misses)
    const paddingX = 14;
    const paddingY = 12;

    const dinoLeft = this.dinoX + paddingX;
    const dinoRight = this.dinoX + this.dinoWidth - paddingX;
    const dinoTop = this.dinoY + paddingY;
    const dinoBottom = this.dinoY + this.dinoHeight - 2;

    const obsLeft = obs.x + 8;
    const obsRight = obs.x + obs.width - 8;
    const obsTop = obs.y + 8;
    const obsBottom = obs.y + obs.height;

    return dinoRight > obsLeft && dinoLeft < obsRight && dinoBottom > obsTop && dinoTop < obsBottom;
  }

  private checkCollectiblePickup(c: Collectible): boolean {
    const dinoLeft = this.dinoX;
    const dinoRight = this.dinoX + this.dinoWidth;
    const dinoTop = this.dinoY;
    const dinoBottom = this.dinoY + this.dinoHeight;

    return dinoRight > c.x - 6 && dinoLeft < c.x + c.width + 6 && dinoBottom > c.y - 6 && dinoTop < c.y + c.height + 6;
  }

  private createPuffParticles(x: number, y: number, count: number, color?: string): void {
    const dark = this.themeService.isDark();
    const defaultColor = color || (dark ? '#78716c' : '#a8a29e');
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y: y + (Math.random() * 4 - 2),
        vx: (Math.random() - 0.5) * 2.5,
        vy: -Math.random() * 2,
        alpha: 1,
        life: 18 + Math.random() * 12,
        color: defaultColor,
        size: 2.5 + Math.random() * 3
      });
    }
  }

  private addFloatingText(x: number, y: number, text: string, color: string): void {
    this.particles.push({
      x,
      y,
      vx: 0.2,
      vy: -1.0,
      alpha: 1,
      life: 45,
      color,
      size: 13,
      text
    });
  }

  // Canvas Rendering
  renderFrame(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dark = this.themeService.isDark();
    const primaryColor = dark ? '#f5f5f4' : '#1c1917';
    const groundColor = dark ? '#44403c' : '#d6d3d1';
    const redAccent = '#ea1c24';

    // Clear background
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // 1. Draw Horizon & Ground Texture
    ctx.strokeStyle = groundColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY + 0.5);
    ctx.lineTo(this.canvasWidth, this.groundY + 0.5);
    ctx.stroke();

    // Ground details (dashes & rolling pebbles)
    ctx.fillStyle = groundColor;
    for (let x = -this.groundOffset; x < this.canvasWidth; x += 32) {
      if (x > 0) {
        ctx.fillRect(x, this.groundY + 5, 14, 2);
        if ((x + Math.floor(this.groundOffset)) % 64 === 0) {
          ctx.fillRect(x + 18, this.groundY + 10, 6, 2);
        }
      }
    }

    // 2. Draw Obstacles
    for (const obs of this.obstacles) {
      this.drawObstacle(ctx, obs, dark);
    }

    // 3. Draw Collectibles
    for (const c of this.collectibles) {
      this.drawCollectible(ctx, c);
    }

    // 4. Draw Dino (Chin-o-saur)
    this.drawDino(ctx, dark);

    // 5. Draw Particles & Floating Text
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.text) {
        ctx.fillStyle = p.color;
        ctx.font = 'bold 13px monospace';
        ctx.fillText(p.text, p.x, p.y);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 6. Draw HUD overlay inside canvas
    this.drawHUD(ctx, dark, primaryColor, redAccent);
  }

  private drawDino(ctx: CanvasRenderingContext2D, dark: boolean): void {
    ctx.save();
    ctx.translate(this.dinoX, this.dinoY);

    const bodyColor = dark ? '#f5f5f4' : '#1c1917';
    const eyeColor = dark ? '#1c1917' : '#ffffff';
    const accentRed = '#ea1c24';

    if (this.gameState() === 'gameover') {
      // Dizzy / Collapsed Dino
      ctx.fillStyle = bodyColor;
      ctx.fillRect(6, 16, 38, 30);
      ctx.fillRect(26, 6, 24, 20);

      // Comical dizzy X eyes
      ctx.strokeStyle = accentRed;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(44, 18);
      ctx.moveTo(44, 12);
      ctx.lineTo(38, 18);
      ctx.stroke();

      // Slumped legs
      ctx.fillRect(8, 46, 16, 6);
      ctx.fillRect(28, 46, 16, 6);
      ctx.restore();
      return;
    }

    if (this.isDucking()) {
      // Crouching Dino (Low flat profile)
      ctx.fillStyle = bodyColor;
      ctx.fillRect(4, 12, 46, 18);
      ctx.fillRect(40, 8, 20, 16);
      ctx.fillRect(58, 12, 6, 8); // Snout

      // Eye
      ctx.fillStyle = eyeColor;
      ctx.fillRect(48, 11, 4, 4);

      // Chin-tapping hand under jaw
      ctx.fillStyle = accentRed;
      ctx.fillRect(52, 20, 5, 4);

      // Legs running low
      ctx.fillStyle = bodyColor;
      const legOffset = Math.sin(this.legPhase) > 0 ? 4 : -4;
      ctx.fillRect(12 + legOffset, 28, 8, 6);
      ctx.fillRect(30 - legOffset, 28, 8, 6);
      ctx.restore();
      return;
    }

    // Standard Running / Jumping Dino (Large, crisp, friendly)
    ctx.fillStyle = bodyColor;

    // Tail
    ctx.fillRect(0, 24, 8, 12);
    ctx.fillRect(6, 18, 8, 18);

    // Torso & Back
    ctx.fillRect(12, 16, 24, 26);

    // Neck & Head
    ctx.fillRect(22, 6, 16, 16);
    ctx.fillRect(28, 0, 24, 16);
    // Snout
    ctx.fillRect(46, 6, 6, 10);

    // Big friendly eye
    ctx.fillStyle = eyeColor;
    ctx.fillRect(36, 4, 5, 5);

    // Chin tap arm & hand (Witty brand touch!)
    ctx.fillStyle = bodyColor;
    ctx.fillRect(28, 22, 12, 4); // Arm
    // Red fingertip tapping the chin thoughtfully
    ctx.fillStyle = accentRed;
    const chinY = 17 + Math.sin(this.legPhase * 1.3) * 3;
    ctx.fillRect(40, chinY, 5, 4);

    // Legs
    ctx.fillStyle = bodyColor;
    if (this.isJumping) {
      // Tucked jump legs
      ctx.fillRect(16, 42, 7, 8);
      ctx.fillRect(28, 42, 7, 8);
    } else {
      // Running legs alternating
      const leg1 = Math.sin(this.legPhase) * 8;
      const leg2 = -leg1;
      ctx.fillRect(18, 42, 6, 16 + leg1 * 0.4);
      ctx.fillRect(18 + leg1 * 0.5, 54, 7, 5);

      ctx.fillRect(28, 42, 6, 16 + leg2 * 0.4);
      ctx.fillRect(28 + leg2 * 0.5, 54, 7, 5);
    }

    ctx.restore();
  }

  private drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle, dark: boolean): void {
    ctx.save();
    ctx.translate(obs.x, obs.y);

    const redAccent = '#ea1c24';

    if (obs.type === 'scope-creep') {
      // Big friendly amorphous blob with post-it notes
      ctx.fillStyle = dark ? '#ef4444' : '#dc2626';
      const wobble = Math.sin(obs.frame * 2) * 3;
      ctx.beginPath();
      ctx.roundRect(2, 6 + wobble, 38, 42 - wobble, 12);
      ctx.fill();

      // Big googly eyes
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, 16 + wobble, 7, 7);
      ctx.fillRect(24, 16 + wobble, 7, 7);
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(13, 19 + wobble, 3, 3);
      ctx.fillRect(27, 19 + wobble, 3, 3);

      // Yellow feature sticky notes sprouting
      ctx.fillStyle = '#fde047';
      ctx.fillRect(28, 1 + wobble, 14, 12);
      ctx.fillStyle = '#854d0e';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('+feat', 30, 9 + wobble);
    } else if (obs.type === 'half-baked') {
      // Half-baked pie on little walking feet
      ctx.fillStyle = dark ? '#f97316' : '#ea580c';
      ctx.beginPath();
      ctx.ellipse(21, 22, 19, 11, 0, 0, Math.PI * 2);
      ctx.fill();

      // Steam squiggles
      ctx.strokeStyle = dark ? '#fed7aa' : '#c2410c';
      ctx.lineWidth = 2;
      const steamY = Math.sin(obs.frame * 3) * 3;
      ctx.beginPath();
      ctx.moveTo(14, 10 + steamY);
      ctx.lineTo(16, 4 + steamY);
      ctx.moveTo(22, 11 + steamY);
      ctx.lineTo(24, 3 + steamY);
      ctx.stroke();

      // Walking feet
      ctx.fillStyle = dark ? '#f5f5f4' : '#1c1917';
      const f1 = Math.sin(obs.frame * 3) * 4;
      ctx.fillRect(12, 32, 5, 8 + f1 * 0.3);
      ctx.fillRect(26, 32, 5, 8 - f1 * 0.3);
    } else if (obs.type === 'meeting') {
      // Flying calendar invite / clock
      ctx.fillStyle = dark ? '#38bdf8' : '#0284c7';
      ctx.fillRect(10, 4, 28, 22);
      // Calendar red header
      ctx.fillStyle = redAccent;
      ctx.fillRect(10, 4, 28, 5);

      // Flapping wings
      ctx.fillStyle = dark ? '#bae6fd' : '#7dd3fc';
      const wingY = Math.sin(obs.frame * 4) * 8;
      ctx.beginPath();
      ctx.moveTo(10, 14);
      ctx.lineTo(0, 11 + wingY);
      ctx.lineTo(10, 20);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(38, 14);
      ctx.lineTo(48, 11 + wingY);
      ctx.lineTo(38, 20);
      ctx.fill();
    } else {
      // Rabbit hole / Tangled cords with bold ?!
      ctx.fillStyle = dark ? '#a8a29e' : '#78716c';
      ctx.beginPath();
      ctx.ellipse(20, 31, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tangled red cords
      ctx.strokeStyle = redAccent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(18, 20, 11, 0, Math.PI * 1.8);
      ctx.stroke();

      // "?!" indicator
      ctx.fillStyle = redAccent;
      ctx.font = 'bold 15px monospace';
      ctx.fillText('?!', 24, 16);
    }

    ctx.restore();
  }

  private drawCollectible(ctx: CanvasRenderingContext2D, c: Collectible): void {
    ctx.save();
    ctx.translate(c.x, c.y);

    const glow = Math.sin(c.pulse) * 4;

    // Glowing halo
    ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
    ctx.beginPath();
    ctx.arc(13, 13, 16 + glow, 0, Math.PI * 2);
    ctx.fill();

    // Lightbulb bulb
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(13, 11, 9, 0, Math.PI * 2);
    ctx.fill();

    // Filament glow
    ctx.fillStyle = '#eab308';
    ctx.fillRect(10, 19, 6, 4);
    ctx.fillRect(11, 23, 4, 3);

    ctx.restore();
  }

  private drawHUD(
    ctx: CanvasRenderingContext2D,
    dark: boolean,
    primaryColor: string,
    redAccent: string
  ): void {
    ctx.save();

    // Coordinate status badge
    ctx.font = '11px monospace';
    ctx.fillStyle = dark ? '#a8a29e' : '#78716c';
    ctx.fillText('COORD: 404.RUN · EASY SPEED', 18, 24);

    // Score & High Score
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'right';
    const scoreStr = this.score().toString().padStart(5, '0');
    const highStr = this.highScore().toString().padStart(5, '0');

    ctx.fillStyle = dark ? '#a8a29e' : '#78716c';
    ctx.fillText(`HI ${highStr} `, this.canvasWidth - 95, 24);

    ctx.fillStyle = primaryColor;
    ctx.fillText(`${scoreStr}`, this.canvasWidth - 18, 24);

    // Eurekas collected pill
    if (this.eurekasCollected() > 0) {
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#eab308';
      ctx.fillText(`💡 ×${this.eurekasCollected()}`, this.canvasWidth - 18, 44);
    }

    ctx.restore();
  }

  // Synthesized 8-bit Audio via Web Audio API (Zero external assets)
  private initAudioContext(): void {
    if (!this.soundEnabled() || !isPlatformBrowser(this.platformId)) return;
    try {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  private playSound(type: 'jump' | 'collect' | 'milestone' | 'gameover'): void {
    if (!this.soundEnabled() || !this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      if (type === 'jump') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.1);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'collect') {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx!.createOscillator();
          const gain = this.audioCtx!.createGain();
          const noteTime = now + idx * 0.05;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.09, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.1);

          osc.connect(gain);
          gain.connect(this.audioCtx!.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.1);
        });
      } else if (type === 'milestone') {
        const freqs = [440, 880];
        freqs.forEach((freq, idx) => {
          const osc = this.audioCtx!.createOscillator();
          const gain = this.audioCtx!.createGain();
          const noteTime = now + idx * 0.08;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.12, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.18);

          osc.connect(gain);
          gain.connect(this.audioCtx!.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.18);
        });
      } else if (type === 'gameover') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.32);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio context failure gracefully ignored
    }
  }
}
