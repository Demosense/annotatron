import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { tap, map, filter, take, switchMap } from "rxjs/operators";
import * as fromStore from '../store';

import { Picture } from '@app/models';

@Injectable()
export class PictureGuards implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pictureId);
        return this.hasPicture(id);
      })
    );
  }

  hasPicture(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getPicturesEntities)
      .pipe(
        map((entities: { [key: number]: Picture}) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPicturesLoaded)
      .pipe(
        filter(loaded => loaded),
        take(1)
      );
  }
}
