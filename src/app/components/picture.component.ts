import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Box, BoxValue, Picture } from '@app/models';

@Component({
  selector: 'app-picture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #layout
            (mousedown)="mdEvent($event)"
            (mouseup)="muEvent($event)"
            (mousemove)="mmEvent($event)"
            (mouseout)="moEvent($event)">
    </canvas>
  `,
  styles: [],
})
export class PictureComponent implements OnInit, OnChanges {
  @Input() picture: Picture;
  @Input() pictureData: string;
  @Input() boxes: BoxValue[];
  @Input() selectedBox: Box;
  @Input() boxesEntities: { id: number; box: Box };

  @Output() boxDrawn = new EventEmitter<any>();

  @ViewChild('layout') canvas: ElementRef;

  public currentPictureId: number = null;
  public data;

  public startX: number = null;
  public startY: number = null;
  public drag = false;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (this.picture && this.picture.id !== this.currentPictureId) {
      this.currentPictureId = this.picture.id;
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.src = this.pictureData;
      this.data = this.pictureData;
      this.canvas.nativeElement.height = this.picture.height;
      this.canvas.nativeElement.width = this.picture.width;
      ctx.drawImage(source, 0, 0);
      ctx.setLineDash([6]);
      Object.keys(this.boxes).forEach(key => {
        const { x0, y0, x1, y1 } = this.boxes[key];
        this.canvas.nativeElement.getContext(
          '2d'
        ).strokeStyle = this.boxesEntities[this.boxes[key].id].color;
        this.canvas.nativeElement
          .getContext('2d')
          .strokeRect(x0, y0, x1 - x0, y1 - y0);
      });
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
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (this.selectedBox) {
      const x = this.startX;
      const y = this.startY;
      const w = e.layerX - x;
      const h = e.layerY - y;
      ctx.setLineDash([6]);
      ctx.strokeStyle = this.selectedBox.color;
      ctx.strokeRect(x, y, w, h);
      this.drawBoxes();
      this.drag = false;
      this.boxDrawn.emit({
        x0: this.startX,
        y0: this.startY,
        x1: e.layerX,
        y1: e.layerY,
      });
    }
  }

  public mmEvent(e) {
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (this.drag) {
      const source = new Image();
      source.src = this.data;
      ctx.canvas.height = source.height;
      ctx.canvas.width = source.width;
      ctx.drawImage(source, 0, 0);
      ctx.setLineDash([6]);
      ctx.strokeStyle = this.selectedBox.color;
      ctx.strokeRect(
        this.startX,
        this.startY,
        e.layerX - this.startX,
        e.layerY - this.startY
      );
      this.drawBoxes();
    }
  }

  public moEvent(e) {
    console.log('mo');
    if (this.drag) {
      this.muEvent(e);
    }
  }

  public drawBoxes() {
    Object.keys(this.boxes).forEach(key => {
      const { id, x0, y0, x1, y1 } = this.boxes[key];
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (id !== this.selectedBox.id) {
        ctx.strokeStyle = 'red';
        ctx.strokeStyle = this.boxesEntities[this.boxes[key].id].color;
        ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      }
    });
  }
}
