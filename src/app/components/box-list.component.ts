import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Box } from '@app/models';

@Component({
  selector: 'app-box-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-nav-list>
      <app-box-list-element
        *ngFor="let box of boxes"
        [box]="box"
        [selected]="selectedBoxId == box.id"
        (click)="select.emit(box)"
      ></app-box-list-element>
    </mat-nav-list>
  `,
  styles: []
})
export class BoxListComponent implements OnInit {

  @Input() boxes: Box[];
  @Input() selectedBoxId: number = -1;
  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
