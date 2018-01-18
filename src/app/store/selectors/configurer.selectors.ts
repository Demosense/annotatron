import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromConfigurer from '../reducers/configurer.reducer';

export const getConfigurerState = createFeatureSelector<
  fromConfigurer.ConfigurerState>('configurer');

export const getConfigurerConfigString = createSelector(
  getConfigurerState,
  fromConfigurer.getConfigurerConfigString
);

export const getConfigurerParsing = createSelector(
  getConfigurerState,
  fromConfigurer.getConfigurerParsing
);

export const getConfigurerParsed = createSelector(
  getConfigurerState,
  fromConfigurer.getConfigurerParsed
);

export const getConfigurerError = createSelector(
  getConfigurerState,
  fromConfigurer.getConfigurerError
);

