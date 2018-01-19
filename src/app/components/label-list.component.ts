import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Label } from '@app/models';

@Component({
  selector: 'app-label-list',
  template: `
    <mat-list>
      <app-label-list-element
        *ngFor="let label of labels"
        [label]="label"
        (changeValue)="updateLabel(label.id, $event)">
      </app-label-list-element>
    </mat-list>
  `,
  styles: []
})
export class LabelListComponent implements OnInit {

  @Input() labels: Label[];
  @Output() updates = new EventEmitter<{ id: number, value: string}>();

  constructor() { }

  ngOnInit() {
  }

  private updateLabel(id: number, value: string) {
    this.updates.emit({ id, value });
  }

}