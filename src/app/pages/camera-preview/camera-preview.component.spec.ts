import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraPreviewComponent } from './camera-preview.component';

describe('CameraPreviewComponent', () => {
  let component: CameraPreviewComponent;
  let fixture: ComponentFixture<CameraPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraPreviewComponent],
    });
    fixture = TestBed.createComponent(CameraPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
