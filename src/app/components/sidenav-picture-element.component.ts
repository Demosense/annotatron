import {Component, Input, OnInit} from '@angular/core';
import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav-picture-element',
  template: `
    <a mat-list-item [routerLink]="['/', picture.id]">
      <img matListAvatar src="{{ picture.data }}">
      <h4 mat-line>{{ picture.file | slice:0:10 }}</h4>
    </a>
  `,
  styles: []
})
export class SidenavPictureElementComponent implements OnInit {

  @Input() picture: Picture;

  constructor() { }

  ngOnInit() {
  }

}
