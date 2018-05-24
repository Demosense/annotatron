import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar fxLayout="row" fxLayoutAlign="start center" color="primary">
      <span>Labeller</span>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: [],
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
