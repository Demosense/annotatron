import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {Picture} from '@app/models';

@Component({
  selector: 'app-picture',
  template: `
    <canvas #layout>
    </canvas>
  `,
  styles: []
})
export class PictureComponent implements OnInit {

  @Input() set picture(value: Picture) {
    if (value) {
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
        this.canvas.nativeElement.height = value.height;
        this.canvas.nativeElement.width = value.width;
        this.context.drawImage(source, 0, 0);
      };
      // source.src = value.data;
    }
  }
  @ViewChild('layout') canvas: ElementRef;
  public context;

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
  }
}
