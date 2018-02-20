import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

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
  @Input() selectedBoxId = -1;
  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  private hotkeys(event) {
    if (event.keyCode === 40) {
      this.select.emit(this.boxes[(this.selectedBoxId + 1) % this.boxes.length]);
    } else if (event.keyCode === 38) {
      this.select.emit(this.boxes[this.selectedBoxId == 0 ? this.boxes.length - 1 : this.selectedBoxId - 1]);
    }
  }
}
