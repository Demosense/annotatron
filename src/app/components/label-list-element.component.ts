import { Component, Input, OnInit } from '@angular/core';

import { Label } from '@app/models';

@Component({
  selector: 'app-label-list-element',
  template: `
    <mat-list-item>
      <mat-icon mat-list-icon >label</mat-icon>
      <h4 mat-line>{{label.name}}</h4>

      <div [ngSwitch]="label.type">
        <div *ngSwitchCase="LABEL_CATEGORY">
          <mat-radio-group>
            <mat-radio-button *ngFor="let cat of label.range" [value]="cat">{{cat}}</mat-radio-button>
          </mat-radio-group>
        </div>
        <div *ngSwitchCase="LABEL_RANGE">
          <mat-slider type="range"
                 [min]="label.range[0]"
                 [max]="label.range[1]"
                 [step]="label.range[3] || 1" 
                 [thumbLabel]="true">
          </mat-slider>
        </div>
      </div>
    </mat-list-item>
  `,
  styles: []
})
export class LabelListElementComponent implements OnInit {

  // Substitute these with the enum when possible.
  readonly LABEL_CATEGORY = 'category';
  readonly LABEL_RANGE = 'range';

  @Input() label: Label;

  constructor() {}

  ngOnInit() {
  }

}
