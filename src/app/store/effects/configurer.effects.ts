import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as configurerActions from '../actions/configurer.actions';
import * as labelActions from '../actions/labels.actions';
import * as boxesActions from '../actions/boxes.actions';
import { ConfigurationService } from '@app/services';

@Injectable()
export class ConfigurerEffects {
  constructor(
    private actions$: Actions,
    private configurationService: ConfigurationService
  ) {}

  /**
   * Listens to an Observable of string and parses the content accordingly. Dispatchs
   * three actions, two for loading the entities and a third one to notify the configuration
   * reducer of a successful parsing. In case of malformed expression it dispatches a fail action
   * for the parsing.
   *
   * @type {Observable<any>}
   */
  @Effect()
  parse$ = this.actions$
    .ofType(configurerActions.ConfigurerActionsTypes.ParseConfig)
    .pipe(
      map((action: configurerActions.ParseConfig) => action.payload),
      switchMap(x =>
        of(x).pipe(
          map(configString =>
            this.configurationService.parseConfigString(configString)
          ),
          mergeMap(({ labels, boxes }) => [
            new labelActions.LoadLabels(labels),
            new boxesActions.LoadBoxes(boxes),
            new configurerActions.ParseConfigSuccess(),
          ]),
          catchError(err => of(new configurerActions.ParseConfigFail(err)))
        )
      )
    );
}
