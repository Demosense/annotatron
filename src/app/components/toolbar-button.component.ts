import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button (click)="navigate.emit()">
      <mat-icon>{{ icon }}</mat-icon>
    </button>
  `,
  styles: []
})
export class ToolbarButtonComponent implements OnInit {

  @Input() icon = '';
  @Output() navigate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
