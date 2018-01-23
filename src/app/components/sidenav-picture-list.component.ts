import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav-picture-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-sidenav-picture-element
      *ngFor="let picture of pictures"
      [picture]="picture"
      [pictureData]="picturesData[picture.id]">
    </app-sidenav-picture-element>
  `,
  styles: []
})
export class SidenavPictureListComponent implements OnInit {

  @Input() pictures: Picture[];
  @Input() picturesData: string[];

  constructor() { }

  ngOnInit() {
  }

}
