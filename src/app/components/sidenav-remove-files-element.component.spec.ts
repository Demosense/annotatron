import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavRemoveFilesElementComponent } from './sidenav-remove-files-element.component';

describe('SidenavRemoveFilesElementComponent', () => {
  let component: SidenavRemoveFilesElementComponent;
  let fixture: ComponentFixture<SidenavRemoveFilesElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavRemoveFilesElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavRemoveFilesElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
