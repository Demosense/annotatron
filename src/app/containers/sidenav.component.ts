import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '@app/store';
import { Picture} from '@app/models';
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
  styles: [`
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
  `]

})
export class SidenavComponent implements OnInit {

  pictures$: Observable<Picture[]>;
  picturesData$: Observable<string[]>;
  labelJsonUri$: Observable<any>;
  downloadName$: Observable<string>;

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

  uploadPictures(event) {
    // Store devtools cannot serialize event.target.files and thus we must
    // handle async operation here.
    this.store.dispatch(new fromStore.LoadPictures());
    this.picturesService.uploadPictures(event.target.files)
      .then((pictures) => {
          console.log(pictures);
          this.picturesService.setPictureData(pictures.map(p => p.data));
          this.store.dispatch(new fromStore.LoadPicturesSuccess(pictures.map(p => p.picture)));
      }
      ).catch((err) =>
        this.store.dispatch(new fromStore.LoadPicturesFail(err))
      );
  }

  removePictures() {
    console.log('Remove Pictures!');
  }

  private toJsonUri(o: Object) {
    const HEADER = 'data:text/json;charset=UTF-8,';
    const s = JSON.stringify(o);
    const uri = encodeURIComponent(s);
    return this.sanitizer.bypassSecurityTrustUrl(`${HEADER}${uri}`);
  }

}
