import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DinoGameComponent } from './dino-game.component';
import { ThemeService } from '../../../core/services/theme.service';

describe('DinoGameComponent', () => {
  let component: DinoGameComponent;
  let fixture: ComponentFixture<DinoGameComponent>;

  beforeEach(async () => {
    // Stub requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 16));
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));

    await TestBed.configureTestingModule({
      imports: [DinoGameComponent],
      providers: [ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(DinoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the dino game component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with idle game state, 0 score, and witty quips pool', () => {
    expect(component.gameState()).toBe('idle');
    expect(component.score()).toBe(0);
    expect(component.highScore()).toBeGreaterThanOrEqual(0);
    expect(component.wittyQuips.length).toBeGreaterThanOrEqual(5);
    expect(component.isDucking()).toBe(false);
  });

  it('should transition to playing state upon startGame', () => {
    component.startGame();
    expect(component.gameState()).toBe('playing');
    expect(component.score()).toBeGreaterThanOrEqual(0);
    expect(component.isJumping).toBe(false);
  });

  it('should handle jump action when playing', () => {
    component.startGame();
    expect(component.isJumping).toBe(false);

    component.jump();
    expect(component.isJumping).toBe(true);
    expect(component.dinoVy).toBe(component.jumpForce);
  });

  it('should start game if jump is called while idle', () => {
    expect(component.gameState()).toBe('idle');
    component.jump();
    expect(component.gameState()).toBe('playing');
  });

  it('should handle duck state correctly', () => {
    component.startGame();
    expect(component.isDucking()).toBe(false);
    expect(component.dinoHeight).toBe(component.normalHeight);

    component.setDuck(true);
    expect(component.isDucking()).toBe(true);
    expect(component.dinoHeight).toBe(component.duckHeight);

    component.setDuck(false);
    expect(component.isDucking()).toBe(false);
    expect(component.dinoHeight).toBe(component.normalHeight);
  });

  it('should toggle pause and resume when game is active', () => {
    component.startGame();
    expect(component.gameState()).toBe('playing');

    component.togglePause();
    expect(component.gameState()).toBe('paused');

    component.togglePause();
    expect(component.gameState()).toBe('playing');
  });

  it('should toggle sound and persist to localStorage', () => {
    const initial = component.soundEnabled();
    component.toggleSound();
    expect(component.soundEnabled()).toBe(!initial);
    expect(localStorage.getItem('chintap-dino-sound')).toBe(String(!initial));
  });

  it('should handle game over with witty quip and high score update', () => {
    component.startGame();
    component.score.set(250);
    component.highScore.set(100);

    // Trigger game over directly via private triggerGameOver simulation
    (component as any).triggerGameOver();

    expect(component.gameState()).toBe('gameover');
    expect(component.lastQuip()).toBeTruthy();
    expect(component.highScore()).toBe(250);
    expect(component.isNewHighScore()).toBe(true);
  });

  it('should clean up animation frame and event listeners on destroy', () => {
    component.startGame();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
