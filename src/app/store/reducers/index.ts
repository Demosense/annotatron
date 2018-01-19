import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer, createFeatureSelector,
} from '@ngrx/store';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromBoxes from './boxes.reducer';
import * as fromLabels from './labels.reducer';
import * as fromPictures from './pictures.reducer';
import * as fromConfigurer from './configurer.reducer';

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  boxes: fromBoxes.BoxState;
  labels: fromLabels.LabelState;
  pictures: fromPictures.PictureState;
  configurer: fromConfigurer.ConfigurerState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  boxes: fromBoxes.reducer,
  labels: fromLabels.reducer,
  pictures: fromPictures.reducer,
  configurer: fromConfigurer.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['configurer'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
