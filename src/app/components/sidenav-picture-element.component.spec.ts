import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPictureElementComponent } from './sidenav-picture-element.component';

describe('SidenavPictureElementComponent', () => {
  let component: SidenavPictureElementComponent;
  let fixture: ComponentFixture<SidenavPictureElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavPictureElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPictureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
