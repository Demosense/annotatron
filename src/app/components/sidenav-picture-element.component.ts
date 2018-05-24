import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav-picture-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a mat-list-item [routerLink]="['/', picture.id]">
      <img matListAvatar [src]="getImage()">
      <h4 mat-line>{{ picture.file | slice:0:10 }}</h4>
    </a>
  `,
  styles: [],
})
export class SidenavPictureElementComponent implements OnInit {
  @Input() picture: Picture;
  @Input() pictureData: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  public getImage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pictureData);
  }
}
