import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavUploadFilesElementComponent } from './sidenav-upload-files-element.component';

describe('SidenavUploadFilesElementComponent', () => {
  let component: SidenavUploadFilesElementComponent;
  let fixture: ComponentFixture<SidenavUploadFilesElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavUploadFilesElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavUploadFilesElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
