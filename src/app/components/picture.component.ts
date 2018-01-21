import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BoxValue, Picture} from '@app/models';

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
export class PictureComponent implements OnInit, OnChanges {

  @Input() picture: Picture;
  @Input() pictureData: string;
  @Input() boxes: BoxValue[];
  @Output() boxDrawn = new EventEmitter<any>();

  @ViewChild('layout') canvas: ElementRef;
  public context;
  public data;
  public startX: number = null;
  public startY: number = null;
  public x1: number = null;
  public y1: number = null;
  public x2: number = null;
  public y2: number = null;
  public drag = false;

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.picture) {
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
        this.canvas.nativeElement.height = this.picture.height;
        this.canvas.nativeElement.width = this.picture.width;
        this.context.drawImage(source, 0, 0);
      };
      source.src = this.pictureData;
      this.data = this.pictureData;
    }
  }

  public mdEvent(e) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.x1 = e.layerX;
    this.y1 = e.layerY;
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
    this.x2 = e.layerX;
    this.y2 = e.layerY;
    this.boxDrawn.emit({ x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 });
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
