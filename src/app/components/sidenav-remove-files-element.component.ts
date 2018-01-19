import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SidenavElement} from '@app/models/sidenav-element';

@Component({
  selector: 'app-sidenav-remove-files-element',
  template: `
    <a mat-list-item (click)="removePictures()">
      <mat-icon mat-list-icon>{{ sidenavElement.icon }}</mat-icon>
      <p mat-line>{{ sidenavElement.name }}</p>
    </a>
  `,
  styles: []
})
export class SidenavRemoveFilesElementComponent implements OnInit {
  @Input() sidenavElement: SidenavElement;
  @Output() remove = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public removePictures() {
    this.remove.emit();
  }
}
