import { Component, Input, OnInit } from '@angular/core';

import { Box } from '@app/models';

@Component({
  selector: 'app-box-list-element',
  template: `
    <mat-list-item>
      <mat-icon mat-list-icon [ngStyle]="{ color: box.color }" >check_box_outline_blank</mat-icon>
      <h4 mat-line>{{box.name}}</h4>
    </mat-list-item>
  `,
  styles: []
})
export class BoxListElementComponent implements OnInit {

  @Input() box: Box;

  constructor() { }

  ngOnInit() {
  }

}
