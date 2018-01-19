import { Component, OnInit } from '@angular/core';
import {SidenavElement} from '@app/models/sidenav-element';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import {Box, Picture} from '@app/models';
import * as fromRoot from '@app/store';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

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
          <mat-divider></mat-divider>
          <app-sidenav-picture-list
            [pictures]="pictures$ | async"
            (select)="selectPicture($event)">
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
    private store: Store<fromStore.State>
  ) {
    this.pictures$ = this.store.select(fromRoot.getAllPictures);
  }

  ngOnInit() {
  }

  onUploadPictures(event) {
    // Store devtools cannot serialize event.target.files and thus we must
    // handle async operation here.

    this.store.dispatch(new fromStore.LoadPictures());

    const upload: Promise<Picture>[] =
      Array.from(event.target.files).map((file: any) => {
        const reader = new FileReader();
        console.log(file);
        return new Promise((resolve, reject) => {
          reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            resolve({
              file: file.name,
              data: e.target.result,
              width: image.width,
              height: image.height,
              labels: [],
              boxes: []
            });
          }
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(upload)
      .then((pictures: Picture[]) =>
        this.store.dispatch(new fromStore.LoadPicturesSuccess(pictures))
      ).catch((err) =>
        this.store.dispatch(new fromStore.LoadPicturesFail(err))
      );
  }

  onRemovePictures() {
    return;
  }

  private selectPicture(event: number) {
    console.log(event);
  }
}
