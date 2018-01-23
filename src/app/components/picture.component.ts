import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import {Box, BoxValue, Picture} from '@app/models';

@Component({
  selector: 'app-picture',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() selectedBox: Box;
  @Input() boxesEntities: { id: number; box: Box};
  @Output() boxDrawn = new EventEmitter<any>();
  @ViewChild('layout') canvas: ElementRef;

  public currentPictureId: number = null;
  public data;
  public startX: number = null;
  public startY: number = null;
  public drag = false;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((this.picture) && (this.picture.id !== this.currentPictureId)) {
      this.currentPictureId = this.picture.id;
      const source = new Image();
      source.crossOrigin = 'Anonymous';
      source.src = this.pictureData;
      this.data = this.pictureData;
      this.canvas.nativeElement.height = this.picture.height;
      this.canvas.nativeElement.width = this.picture.width;
      this.canvas.nativeElement.getContext('2d').drawImage(source, 0, 0);
      this.canvas.nativeElement.getContext('2d').setLineDash([6]);
      Object.keys(this.boxes).forEach(key => {
        const { x0, y0, x1, y1 } = this.boxes[key];
        this.canvas.nativeElement.getContext('2d').strokeStyle = this.boxesEntities[this.boxes[key].id].color;
        this.canvas.nativeElement.getContext('2d').strokeRect(x0, y0, x1 - x0, y1 - y0);
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
    if (this.selectedBox) {
      const x = this.startX;
      const y = this.startY;
      const w = e.layerX - x;
      const h = e.layerY - y;
      this.canvas.nativeElement.getContext('2d').setLineDash([6]);
      this.canvas.nativeElement.getContext('2d').strokeStyle = this.selectedBox.color;
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
      this.canvas.nativeElement.getContext('2d').strokeStyle = this.selectedBox.color;
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
    Object.keys(this.boxes).forEach(key => {
      const { id, x0, y0, x1, y1 } = this.boxes[key];

      if (id !== this.selectedBox.id) {
        this.canvas.nativeElement.getContext('2d').strokeStyle = 'red';
        this.canvas.nativeElement.getContext('2d').strokeStyle = this.boxesEntities[this.boxes[key].id].color;
        this.canvas.nativeElement.getContext('2d').strokeRect(x0, y0, x1 - x0, y1 - y0);
      }
    });
  }
}
