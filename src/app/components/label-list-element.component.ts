import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-list-element',
  template: `
    <a mat-list-item>
      <mat-icon mat-list-icon>label</mat-icon>
      <span>Label</span>
    </a>
  `,
  styles: []
})
export class LabelListElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
