import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDownloadElementComponent } from './sidenav-download-element.component';

describe('SidenavDownloadElementComponent', () => {
  let component: SidenavDownloadElementComponent;
  let fixture: ComponentFixture<SidenavDownloadElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavDownloadElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavDownloadElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
