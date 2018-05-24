import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Box, Label, Picture } from '@app/models';
import * as fromRoot from '@app/store';

import { LabelValue } from '@app/models/label';
import { PicturesService } from '@app/services';

@Component({
  selector: 'app-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper" fxLayout="row" fxLayoutAlign="start" fxLayoutGap="10px" >

      <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px">
        <mat-card fxFlex="25" class="element-list">
          <mat-card-header>
            <mat-card-title>Boxes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-box-list
              [boxes]="boxes$ | async"
              [selectedBoxId]="(selectedBox$ | async)?.id"
              (select)="selectBox($event)">
            </app-box-list>
          </mat-card-content>
        </mat-card>

          <mat-card fxFlex="75" class="element-list">
            <mat-card-header>
              <mat-card-title>Labels</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <app-label-list
                [labels]="labels$ | async"
                [labelValues]="(picture$ | async)?.labels"
                (updates)="updateLabel($event)">
              </app-label-list>
            </mat-card-content>
          </mat-card>
        </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>
            {{ (picture$ | async)?.file | slice:0:20 }}
            <button mat-icon-button *ngIf="(picture$ | async)?.file" (click)="removePicture()">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-title>
        </mat-card-header>
        <mat-card-actions fxLayoutAlign="center center">
          <app-picture-button
            [icon]="'keyboard_arrow_left'"
            [numKey]="65"
            (changePicture)="previousPicture()"
          ></app-picture-button>
          <app-picture-button
            [icon]="'keyboard_arrow_right'"
            [numKey]="68"
            (changePicture)="nextPicture()"
          ></app-picture-button>
        </mat-card-actions>
        <mat-card-content>
          <app-picture
            [picture]="picture$ | async"
            [pictureData]="pictureData$ | async"
            [boxes]="(picture$ | async)?.boxes"
            [selectedBox]="selectedBox$ | async"
            [boxesEntities]="boxEntities$ | async"
            (boxDrawn)="boxDrawn($event)">
          </app-picture>
        </mat-card-content>
      </mat-card>

    </div>
  `,
  styles: [
    `
    .wrapper {
      padding: 15px;
      height: 100%;
    }

    .element-list {
      overflow: scroll;
    }

  `,
  ],
})
export class MainComponent implements OnInit {
  boxes$: Observable<Box[]>;
  boxEntities$: Observable<{ [id: number]: Box }>;
  labels$: Observable<Label[]>;
  picture$: Observable<Picture>;
  pictures$: Observable<Picture[]>;
  pictureData$: Observable<string>;
  selectedBox$: Observable<Box>;

  constructor(
    private store: Store<fromRoot.State>,
    private picturesService: PicturesService
  ) {
    this.boxes$ = this.store.pipe(select(fromRoot.getAllBoxes));
    this.labels$ = this.store.pipe(select(fromRoot.getAllLabels));
    this.boxEntities$ = this.store.pipe(select(fromRoot.getBoxesEntities));
    this.picture$ = this.store.pipe(select(fromRoot.getSelectedPicture));
    this.pictures$ = this.store.pipe(select(fromRoot.getAllPictures));
    this.selectedBox$ = this.store.pipe(select(fromRoot.getSelectedBox));
    this.pictureData$ = this.picturesService
      .getPictureData()
      .pipe(
        combineLatest(this.picture$),
        map(([data, picture]) => (picture ? data[picture.id] : ''))
      );
  }

  ngOnInit() {}

  updateLabel(labelValue: LabelValue) {
    this.picture$
      .pipe(first())
      .subscribe(picture =>
        this.store.dispatch(
          new fromRoot.UpdateLabel({ pictureId: picture.id, labelValue })
        )
      );
  }

  selectBox(event: Box) {
    this.store.dispatch(new fromRoot.SelectedBox(event));
  }

  boxDrawn({ x0, y0, x1, y1 }) {
    this.picture$
      .pipe(withLatestFrom(this.selectedBox$), first())
      .subscribe(([picture, selectedBox]) =>
        this.store.dispatch(
          new fromRoot.UpdateBox({
            pictureId: picture.id,
            boxValue: { id: selectedBox.id, x0, y0, x1, y1 },
          })
        )
      );
  }

  previousPicture() {
    this.pictures$
      .pipe(withLatestFrom(this.picture$), first())
      .subscribe(([pictures, picture]) => {
        const previousPictures = pictures.filter(p => p.id < picture.id);
        this.store.dispatch(
          new fromRoot.Go({
            path: [
              '/',
              previousPictures.length > 0
                ? previousPictures[previousPictures.length - 1].id
                : pictures[pictures.length - 1].id,
            ],
          })
        );
      });
  }

  nextPicture() {
    this.pictures$
      .pipe(withLatestFrom(this.picture$), first())
      .subscribe(([pictures, picture]) => {
        const nextPictures = pictures.filter(p => p.id > picture.id);
        this.store.dispatch(
          new fromRoot.Go({
            path: [
              '/',
              nextPictures.length > 0 ? nextPictures[0].id : pictures[0].id,
            ],
          })
        );
      });
  }

  removePicture() {
    this.pictures$
      .pipe(withLatestFrom(this.picture$), first())
      .subscribe(([pictures, picture]) => {
        const previousPictures = pictures.filter(p => p.id < picture.id);
        this.store.dispatch(
          new fromRoot.RemovePicture({
            pictureId: picture.id,
            previousPictureId:
              previousPictures.length > 0
                ? previousPictures[previousPictures.length - 1].id
                : pictures[pictures.length - 1].id,
          })
        );
      });
  }
}
