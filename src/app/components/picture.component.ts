import {Component, Input, OnInit} from '@angular/core';
import {Picture} from '@app/models';

@Component({
  selector: 'app-picture',
  template: `
    <canvas></canvas>`,
  styles: []
})
export class PictureComponent implements OnInit {

  @Input() picture: Picture;

  constructor() { }

  ngOnInit() {
  }

}
