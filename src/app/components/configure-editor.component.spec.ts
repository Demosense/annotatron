import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureEditorComponent } from './configure-editor.component';

describe('ConfigureEditorComponent', () => {
  let component: ConfigureEditorComponent;
  let fixture: ComponentFixture<ConfigureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
