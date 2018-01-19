import { Component, Input, OnInit } from '@angular/core';
import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav-picture-list',
  template: `
    <app-sidenav-picture-element
      *ngFor="let picture of pictures"
      [picture]="picture">
    </app-sidenav-picture-element>
  `,
  styles: []
})
export class SidenavPictureListComponent implements OnInit {

  @Input() pictures: Picture[];

  constructor() { }

  ngOnInit() {
  }

}
