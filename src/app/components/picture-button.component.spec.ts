import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureButtonComponent } from './picture-button.component';

describe('PictureButtonComponent', () => {
  let component: PictureButtonComponent;
  let fixture: ComponentFixture<PictureButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PictureButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
