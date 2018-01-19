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
    <canvas #layout
            (mousedown)="mdEvent($event)" 
            (mouseup)="muEvent($event)" 
            (mousemove)="mmEvent($event)">
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
      // this.data = value.data;
    }
  }
  @ViewChild('layout') canvas: ElementRef;
  public context;
  public data;
  public startX: number = null;
  public startY: number = null;
  public firstClickX: number = null;
  public firstClickY: number = null;
  public secondClickX: number = null;
  public secondClickY: number = null;
  public drag = false;

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  public mdEvent(e) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.firstClickX = e.layerX;
    this.firstClickY = e.layerY;
    this.drag = true;
  }

  public muEvent(e) {
    const x = this.startX - this.canvas.nativeElement.getBoundingClientRect().left;
    const y = this.startY - this.canvas.nativeElement.getBoundingClientRect().top;
    const w = e.clientX - this.canvas.nativeElement.getBoundingClientRect().left - x;
    const h = e.clientY - this.canvas.nativeElement.getBoundingClientRect().top - y;
    this.canvas.nativeElement.getContext('2d').setLineDash([6]);
    this.canvas.nativeElement.getContext('2d').strokeRect(x, y, w, h);
    this.drag = false;
    this.secondClickX = e.layerX;
    this.secondClickY = e.layerY;
  }

  public mmEvent(e) {
    if (this.drag) {
      const source = new Image();
      source.src = this.data;
      const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
      const sx = this.startX;
      const sy = this.startY;
      const canvasTop = this.canvas.nativeElement.getBoundingClientRect().top;
      const canvasLeft = this.canvas.nativeElement.getBoundingClientRect().left;
      source.onload = function () {
        context.canvas.height = source.height;
        context.canvas.width = source.width;
        context.drawImage(source, 0, 0);
        const x = sx - canvasLeft;
        const y = sy - canvasTop;
        const w = e.clientX - canvasLeft - x;
        const h = e.clientY - canvasTop - y;
        context.setLineDash([6]);
        context.strokeRect(x, y, w, h);
      };
    }
  }
}
