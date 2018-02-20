import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';

import { Box } from '@app/models';

@Component({
  selector: 'app-box-list-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list-item [ngClass]="{'selected': selected }">
      <mat-icon mat-list-icon [ngStyle]="{ color: box.color }" >check_box_outline_blank</mat-icon>
      <h4 mat-line>{{box.name}}</h4>
    </mat-list-item>
  `,
  styles: [`
      .selected {
        color: lightgrey;
        -webkit-box-shadow:inset 0px 0px 0px 25px #b0b0b0;
        -moz-box-shadow:inset 0px 0px 0px 25px #b0b0b0;
        box-shadow:inset 0px 0px 0px 25px #b0b0b0;
      }
    `]
})
export class BoxListElementComponent implements OnInit {

  @Input() box: Box;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  private hotkeys(event) {
    return;
  }
}
