import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar fxLayout="row" fxLayoutAlign="start center" color="primary" class="mat-elevation-z10">
      <span>Labeller</span>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
