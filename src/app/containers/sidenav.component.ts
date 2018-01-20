import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '@app/store';
import { Picture} from '@app/models';
import { PicturesService } from '@app/services';
import { SidenavElement } from '@app/models/sidenav-element';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav-container class="mat-elevation-z6">
      <mat-sidenav mode="side" opened="true" class="mat-elevation-z6">
        <mat-nav-list>
          <app-sidenav-upload-files-element
            [sidenavElement]="sidenavElements[0]"
            (upload)="onUploadPictures($event)">
          </app-sidenav-upload-files-element>
          <app-sidenav-remove-files-element
            [sidenavElement]="sidenavElements[1]"
            (remove)="onRemovePictures()">
          </app-sidenav-remove-files-element>
          <a mat-list-item [href]="labelJsonUri$ | async" [download]="downloadName$ | async">
          <mat-icon mat-list-icon>file_download</mat-icon>
            <p mat-line>Download</p>
          </a>
          <mat-divider></mat-divider>
          <app-sidenav-picture-list
            [pictures]="pictures$ | async"
            [picturesData]="picturesData$ | async">
          </app-sidenav-picture-list>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="10px">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
      padding-top: 15px;
    }
  `]

})
export class SidenavComponent implements OnInit {

  pictures$: Observable<Picture[]>;
  picturesData$: Observable<string[]>;
  labelJsonUri$: Observable<any>;
  downloadName$: Observable<string>;

  sidenavElements: SidenavElement[] = [
    {
      name: 'Upload Pictures',
      icon: 'image'
    },
    {
      name: 'Remove Pictures',
      icon: 'delete'
    }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<fromStore.State>,
    private picturesService: PicturesService,
  ) {
    this.pictures$ = this.store.select(fromRoot.getAllPictures);
    this.picturesData$ = this.picturesService.getPictureData();
    this.labelJsonUri$ = this.store.select(fromRoot.getLabelledPictures).pipe(
      map(labelledPictures => this.toJsonUri(labelledPictures)),
    );
    this.downloadName$ = this.labelJsonUri$.pipe(
      map(() => `${Date.now()}.json`),
    );
  }

  ngOnInit() {
  }

  onUploadPictures(event) {
    // Store devtools cannot serialize event.target.files and thus we must
    // handle async operation here.

    this.store.dispatch(new fromStore.LoadPictures());

    const upload: Promise<{ data: string, picture: Picture }>[] =
      Array.from(event.target.files).map((file: any) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = () =>
              resolve({
                data: e.target.result,
                picture: {
                  file: file.name,
                  width: image.width,
                  height: image.height,
                  labels: [],
                  boxes: []
                }
              });
          }
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(upload)
      .then((pictures) => {
          this.picturesService.setPictureData(pictures.map(p => p.data));
          this.store.dispatch(new fromStore.LoadPicturesSuccess(pictures.map(p => p.picture)));
      }
      ).catch((err) =>
        this.store.dispatch(new fromStore.LoadPicturesFail(err))
      );
  }

  onRemovePictures() {
    return;
  }

  private toJsonUri(o: Object) {
    const HEADER = 'data:text/json;charset=UTF-8,';
    const s = JSON.stringify(o);
    const uri = encodeURIComponent(s);
    return this.sanitizer.bypassSecurityTrustUrl(`${HEADER}${uri}`);
  }

}
