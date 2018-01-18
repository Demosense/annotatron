import { Component, Input, OnInit } from '@angular/core';

import { Label } from '@app/models';

@Component({
  selector: 'app-label-list',
  template: `
    <mat-list>
      <app-label-list-element 
        *ngFor="let label of labels"
        [label]="label" ></app-label-list-element>
    </mat-list>
  `,
  styles: []
})
export class LabelListComponent implements OnInit {

  @Input() labels: Label[];

  constructor() { }

  ngOnInit() {
  }

}
