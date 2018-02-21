import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as routerActions from '../actions/router.actions';
import * as picturesActions from '../actions/pictures.actions';

@Injectable()
export class PicturesEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  pictureRemove$ = this.actions$
    .ofType(picturesActions.PicturesActionTypes.RemovePicture)
    .pipe(
      map((action: picturesActions.RemovePicture) => action.payload),
      map(({ pictureId, previousPictureId }) => {
        return new routerActions.Go({
          path: ['/', previousPictureId],
        });
      })
    );
}
