import { Component, Input, OnInit } from '@angular/core';

import { Label } from '@app/models';

@Component({
  selector: 'app-label-list-element',
  template: `
    <mat-list-item>
      <mat-icon mat-list-icon >label</mat-icon>
      <h4 mat-line>{{label.name}}</h4>
    </mat-list-item>
  `,
  styles: []
})
export class LabelListElementComponent implements OnInit {

  @Input() label: Label;

  constructor() { }

  ngOnInit() {
  }

}
