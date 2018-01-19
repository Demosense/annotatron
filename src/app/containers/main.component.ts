import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {Box, Label, Picture} from '@app/models';
import * as fromRoot from '@app/store';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-main',
  template: `
    <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px" >

      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ (picture$ | async).file | slice:0:20 }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-picture [picture]="picture$ | async"></app-picture>
        </mat-card-content>
        <mat-card-actions fxLayoutAlign="center center">
          <app-picture-button [icon]="'keyboard_arrow_left'"></app-picture-button>
          <app-picture-button [icon]="'keyboard_arrow_right'"></app-picture-button>
        </mat-card-actions>
      </mat-card>

      <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px" >
        <mat-card>
          <mat-card-header>
            <mat-card-title>Boxes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-box-list
            [boxes]="boxes$ | async"
            (select)="selectBox($event)">
            </app-box-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Labels</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-label-list
              [labels]="labels$ | async"
              (updates)="updateLabel($event)">
            </app-label-list>
          </mat-card-content>
        </mat-card>
      </div>

    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  boxes$: Observable<Box[]>;
  labels$: Observable<Label[]>;
  picture$: Observable<Picture>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.boxes$ = this.store.select(fromRoot.getAllBoxes);
    this.labels$ = this.store.select(fromRoot.getAllLabels);
    this.picture$ = this.store.select(fromRoot.getSelectedPicture);
  }

  ngOnInit() {
  }

  private updateLabel(event: { id: number, value: string}) {
    console.log(event);
  }

  private selectBox(event: number) {
    console.log(event);
  }
}

