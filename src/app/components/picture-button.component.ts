import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-picture-button',
  template: `
    <button mat-icon-button (click)="onChangePicture()">
      <mat-icon aria-label="Example icon-button with a heart icon">{{ icon }}</mat-icon>
    </button>
  `,
  styles: []
})
export class PictureButtonComponent implements OnInit {

  @Input() icon: string;
  @Output() changePicture = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public onChangePicture() {
    this.changePicture.emit();
  }
}
