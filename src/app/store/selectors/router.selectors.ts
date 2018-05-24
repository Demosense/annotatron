import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '@app/store/reducers';
import * as fromRouter from '@ngrx/router-store';

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');
