import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as configurerActions from '../actions/configurer.actions';
import * as labelActions from '../actions/labels.actions';
import { ConfigurationService } from '@app/services';

@Injectable()
export class ConfigurerEffects {

  constructor(
    private actions$: Actions,
    private configurer: ConfigurationService,
  ) {}

  @Effect()
  parse$ = this.actions$
    .ofType(configurerActions.ConfigurerActionsTypes.ParseConfig)
    .pipe(
      map((action: configurerActions.ParseConfig) => action.payload),
      switchMap(x => of(x)
          .pipe(
            map(configString => this.configurer.parseConfigString(configString)),
            mergeMap(({ labels, boxes }) => [
              new labelActions.LoadLabelsSuccess(labels),
              new configurerActions.ParseConfigSuccess(),
            ]),
            catchError( err => of(new configurerActions.ParseConfigFail(err))),
          )
      )
    );

}
