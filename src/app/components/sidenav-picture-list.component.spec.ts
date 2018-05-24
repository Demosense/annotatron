import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPictureListComponent } from './sidenav-picture-list.component';

describe('SidenavPictureListComponent', () => {
  let component: SidenavPictureListComponent;
  let fixture: ComponentFixture<SidenavPictureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavPictureListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPictureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
