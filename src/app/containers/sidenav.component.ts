import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '@app/store';
import { Box, Label, Picture } from '@app/models';
import { PicturesService } from '@app/services';

@Component({
  selector: 'app-sidenav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true" class="mat-elevation-z4">
        <mat-nav-list>
          <app-sidenav-upload-files-element
            (upload)="uploadPictures($event)">
          </app-sidenav-upload-files-element>
          <app-sidenav-remove-files-element
            (click)="removePictures()">
          </app-sidenav-remove-files-element>
          <app-sidenav-download-element
            [labelJsonUri]="labelJsonUri$ | async"
            [downloadName]="downloadName$ | async">
          </app-sidenav-download-element>
          <mat-divider></mat-divider>
          <app-sidenav-picture-list
            [pictures]="pictures$ | async"
            [picturesData]="picturesData$ | async">
          </app-sidenav-picture-list>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    mat-sidenav {
      box-shadow: 3px 0 6px rgba(0, 0, 0, .24);
      padding-bottom: 72px;
      bottom: 0;
      overflow: auto;
      height: 100%;
    }
    mat-sidenav-container {
      height: 100%;
    }
  `,
  ],
})
export class SidenavComponent implements OnInit {
  pictures$: Observable<Picture[]>;
  picturesData$: Observable<string[]>;
  labelJsonUri$: Observable<any>;
  downloadName$: Observable<string>;
  boxes$: Observable<Box[]>;
  labels$: Observable<Label[]>;

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<fromStore.State>,
    private picturesService: PicturesService
  ) {
    this.pictures$ = this.store.pipe(select(fromRoot.getAllPictures));
    this.boxes$ = this.store.pipe(select(fromRoot.getAllBoxes));
    this.labels$ = this.store.pipe(select(fromRoot.getAllLabels));
    this.picturesData$ = this.picturesService.getPictureData();
    this.labelJsonUri$ = this.store.pipe(
      select(fromRoot.getLabelledPictures),
      map(labelledPictures => this.toJsonUri(labelledPictures))
    );
    this.downloadName$ = this.labelJsonUri$.pipe(
      map(() => `${Date.now()}.csv`)
    );
  }

  ngOnInit() {}

  uploadPictures(event) {
    // Store devtools cannot serialize event.target.files and thus we must
    // handle async operation here.
    this.store.dispatch(new fromStore.LoadPictures());
    this.picturesService
      .uploadPictures(event.target.files)
      .then(pictures => {
        this.picturesService.setPictureData(pictures.map(p => p.data));
        this.store.dispatch(
          new fromStore.LoadPicturesSuccess(pictures.map(p => p.picture))
        );
      })
      .catch(err => this.store.dispatch(new fromStore.LoadPicturesFail(err)));
  }

  removePictures() {
    console.log('Remove Pictures!');
  }

  private toJsonUri(o: Object) {
    const csvData = this.ConvertToCSV(JSON.stringify(o));
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private ConvertToCSV(objArray) {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let header = 'filename,';
    let boxes;
    let labels;
    let csvResult = '';

    // Creating CSV header
    this.labels$.pipe(first()).subscribe(lbs => {
      labels = lbs;
      lbs.map(label => {
        header += label.name + ',';
      });
    });

    this.boxes$.pipe(first()).subscribe(bxs => {
      boxes = bxs;
      bxs.map(box => {
        header += box.name + ',';
      });
    });
    csvResult = header.substring(0, header.length - 1) + '\r\n';

    // Creating CSV data
    for (let i = 0; i < array.length; i++) {
      let line = array[i].file + ',';
      for (let iL = 0; iL < labels.length; iL++) {
        if (array[i].labels[labels[iL].name] === undefined) {
          line += ',';
        } else {
          line += array[i].labels[labels[iL].name] + ',';
        }
      }
      for (let iB = 0; iB < boxes.length; iB++) {
        if (array[i].boxes[boxes[iB].name] === undefined) {
          line += ',';
        } else {
          line +=
            array[i].boxes[boxes[iB].name].x0 +
            '-' +
            array[i].boxes[boxes[iB].name].y0 +
            '-' +
            array[i].boxes[boxes[iB].name].x1 +
            '-' +
            array[i].boxes[boxes[iB].name].y1 +
            ',';
        }
      }

      csvResult += line.substring(0, line.length - 1) + '\r\n';
    }
    return csvResult;
  }
}
