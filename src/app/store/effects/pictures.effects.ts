import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pictureActions from '../actions/pictures.actions';
import { PicturesService} from '@app/services';

@Injectable()
export class PicturesEffects {

  constructor(
    private actions$: Actions,
    private picturesService: PicturesService,
  ) {}

  @Effect()
  parse$ = this.actions$
    .ofType(pictureActions.PicturesActionTypes.LoadPictures)
    .pipe(
      tap(() => console.log('YEAH')),
      map((action: pictureActions.LoadPictures) => action.payload),
      switchMap(x => of(x)
        .pipe(
          map(files => this.picturesService.getPictures(files)),
          map(pictures => new pictureActions.LoadPicturesSuccess(pictures)),
          catchError(error => of(new pictureActions.LoadPicturesFail(error)))
        )
      )
    );
}
