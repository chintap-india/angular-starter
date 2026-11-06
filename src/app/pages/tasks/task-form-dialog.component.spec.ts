import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskFormDialogComponent, TaskDialogData } from './task-form-dialog.component';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let mockDialogRef: any;

  const dialogData: TaskDialogData = {
    mode: 'create',
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: vi.fn(),
      updateSize: vi.fn(),
      addPanelClass: vi.fn(),
      removePanelClass: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TaskFormDialogComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create task form dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with properties collapsed by default', () => {
    expect(component.isPropertiesExpanded()).toBe(false);
  });

  it('should toggle properties expansion state', () => {
    component.toggleProperties();
    expect(component.isPropertiesExpanded()).toBe(true);

    component.toggleProperties();
    expect(component.isPropertiesExpanded()).toBe(false);
  });

  it('should toggle fullscreen mode and update dialog size', () => {
    expect(component.isFullscreen()).toBe(false);

    component.toggleFullscreen();
    expect(component.isFullscreen()).toBe(true);
    expect(mockDialogRef.updateSize).toHaveBeenCalledWith('100vw', '100vh');
    expect(mockDialogRef.addPanelClass).toHaveBeenCalledWith('full-screen-dialog-panel');

    component.toggleFullscreen();
    expect(component.isFullscreen()).toBe(false);
    expect(mockDialogRef.updateSize).toHaveBeenCalledWith('680px', 'auto');
    expect(mockDialogRef.removePanelClass).toHaveBeenCalledWith('full-screen-dialog-panel');
  });

  it('should handle pasting URLs gracefully over highlighted text', () => {
    const textarea = document.createElement('textarea');
    textarea.value = 'Check out this awesome doc here';
    // Highlight "awesome doc" (index 15 to 26)
    textarea.selectionStart = 15;
    textarea.selectionEnd = 26;

    const fakeClipboard = {
      getData: vi.fn().mockReturnValue('https://angular.dev'),
    };
    const pasteEvent = {
      clipboardData: fakeClipboard,
      preventDefault: vi.fn(),
    } as unknown as ClipboardEvent;

    component.onPaste(pasteEvent, textarea);

    expect(pasteEvent.preventDefault).toHaveBeenCalled();
    expect(component.taskForm.controls.description.value).toBe(
      'Check out this [awesome doc](https://angular.dev) here'
    );
  });

  it('should validate form and save valid task', () => {
    component.taskForm.controls.title.setValue('My New Enterprise Task');
    component.taskForm.controls.category.setValue('Architecture');
    component.taskForm.controls.priority.setValue('high');
    component.taskForm.controls.status.setValue('in-progress');
    component.taskForm.controls.description.setValue('Task details here');

    component.save();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      action: 'save',
      dto: expect.objectContaining({
        title: 'My New Enterprise Task',
        category: 'Architecture',
        priority: 'high',
        status: 'in-progress',
      }),
    });
  });
});
