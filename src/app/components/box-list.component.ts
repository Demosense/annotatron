import { Component, Input, OnInit } from '@angular/core';

import { Box } from '@app/models';

@Component({
  selector: 'app-box-list',
  template: `
    <mat-nav-list>
      <app-box-list-element
        *ngFor="let box of boxes"
        [box]="box" ></app-box-list-element>
    </mat-nav-list>
  `,
  styles: []
})
export class BoxListComponent implements OnInit {

  @Input() boxes: Box[];

  constructor() { }

  ngOnInit() {
  }

}
