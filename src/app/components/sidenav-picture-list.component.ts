import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav-picture-list',
  template: `
    <app-sidenav-picture-element
      *ngFor="let picture of pictures"
      [picture]="picture"
      (click)="select.emit(picture.id)"></app-sidenav-picture-element>
  `,
  styles: []
})
export class SidenavPictureListComponent implements OnInit {

  @Input() pictures: Picture[];
  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
