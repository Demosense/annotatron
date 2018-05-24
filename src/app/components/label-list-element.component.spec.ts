import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelListElementComponent } from './label-list-element.component';

describe('LabelListElementComponent', () => {
  let component: LabelListElementComponent;
  let fixture: ComponentFixture<LabelListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelListElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
