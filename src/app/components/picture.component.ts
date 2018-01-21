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
  @Input() selectedBox: number;
  @Output() boxDrawn = new EventEmitter<any>();
  @ViewChild('layout') canvas: ElementRef;

  public pictureId: number = null;
  public data;
  public startX: number = null;
  public startY: number = null;
  public drag = false;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((this.picture) && (this.picture.id !== this.pictureId)) {
      this.pictureId = this.picture.id;
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.src = this.pictureData;
      this.data = this.pictureData;
      this.canvas.nativeElement.height = this.picture.height;
      this.canvas.nativeElement.width = this.picture.width;
      this.canvas.nativeElement.getContext('2d').drawImage(source, 0, 0);
      this.canvas.nativeElement.getContext('2d').setLineDash([6]);
      for (const key in this.boxes) {
        this.canvas.nativeElement.getContext('2d').strokeRect(
          this.boxes[key].points.x0,
          this.boxes[key].points.y0,
          this.boxes[key].points.x1 - this.boxes[key].points.x0,
          this.boxes[key].points.y1 - this.boxes[key].points.y0
        );
      }
    }
  }

  public mdEvent(e) {
    if (this.selectedBox) {
      this.startX = e.layerX;
      this.startY = e.layerY;
      this.drag = true;
      this.drawBoxes();
    }
  }

  public muEvent(e) {
    if (this.selectedBox) {
      const x = this.startX;
      const y = this.startY;
      const w = e.layerX - x;
      const h = e.layerY - y;
      this.canvas.nativeElement.getContext('2d').setLineDash([6]);
      this.canvas.nativeElement.getContext('2d').strokeRect(x, y, w, h);
      this.drawBoxes();
      this.drag = false;
      this.boxDrawn.emit({x0: this.startX, y0: this.startY, x1: e.layerX, y1: e.layerY});
    }
  }

  public mmEvent(e) {
    if (this.drag) {
      const source = new Image();
      source.src = this.data;
      this.canvas.nativeElement.getContext('2d').canvas.height = source.height;
      this.canvas.nativeElement.getContext('2d').canvas.width = source.width;
      this.canvas.nativeElement.getContext('2d').drawImage(source, 0, 0);
      this.canvas.nativeElement.getContext('2d').setLineDash([6]);
      this.canvas.nativeElement.getContext('2d').strokeRect(
        this.startX,
        this.startY,
        e.layerX - this.startX,
        e.layerY - this.startY
      );
      this.drawBoxes();
    }
  }

  public drawBoxes() {
    for (const key in this.boxes) {
      if (this.boxes[key].id !== this.selectedBox) {
        this.canvas.nativeElement.getContext('2d').strokeRect(
          this.boxes[key].points.x0,
          this.boxes[key].points.y0,
          this.boxes[key].points.x1 - this.boxes[key].points.x0,
          this.boxes[key].points.y1 - this.boxes[key].points.y0
        );
      }
    }
  }
}
