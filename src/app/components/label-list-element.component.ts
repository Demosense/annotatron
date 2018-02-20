import {
  AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output,
  ViewChild
} from '@angular/core';

import { Label, LabelValue } from '@app/models';

@Component({
  selector: 'app-label-list-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout="row" fxLayoutGap="0px">

      <div fxFlex="10px" class="label-status"></div>

      <div fxFlex fxLayout="column" class="label-content">

        <h4>{{label.name}}</h4>

        <div [ngSwitch]="label.type">

          <div *ngSwitchCase="LABEL_CATEGORY">
            <mat-radio-group
              fxLayout="column"
              (change)="changeValue.emit($event.value)"
              [value]="labelValue?.value || ''"
            >
              <mat-radio-button
                *ngFor="let cat of label.range"
                [value]="cat"
              >{{cat}}
              </mat-radio-button>
            </mat-radio-group>
          </div>

          <div *ngSwitchCase="LABEL_RANGE">
            <mat-slider type="range"
                        (change)="changeValue.emit($event.value)"
                        [min]="label.range[0]"
                        [max]="label.range[1]"
                        [step]="label.range[3] || 1"
                        [thumbLabel]="true"
                        [value]="labelValue?.value || label.range[0]">
            </mat-slider>
          </div>

        </div>

      </div>

    </div>
  `,
  styles: [`
    .label-status {
      background-color: grey;
    }

    .label-content {
      padding: 3;
      padding-left: 10px;
    }
  `]
})
export class LabelListElementComponent implements OnInit {

  // Substitute these with the enum when possible.
  readonly LABEL_CATEGORY = 'category';
  readonly LABEL_RANGE = 'range';

  @Input() label: Label;
  @Input() labelValue: LabelValue;
  @Output() changeValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }
}
