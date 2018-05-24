import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxListElementComponent } from './box-list-element.component';

describe('BoxListElementComponent', () => {
  let component: BoxListElementComponent;
  let fixture: ComponentFixture<BoxListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoxListElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
