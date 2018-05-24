import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { tap, map } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';
import * as routerActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(routerActions.RouterActionTypes.Go).pipe(
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(routerActions.RouterActionTypes.Back)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(routerActions.RouterActionTypes.Forward)
    .pipe(tap(() => this.location.forward()));
}
