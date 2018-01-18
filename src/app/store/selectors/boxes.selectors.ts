import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBoxes from '../reducers/boxes.reducer';

export const getBoxesState = createFeatureSelector<
  fromBoxes.BoxState>('boxes');

export const getBoxesEntities = createSelector(
  getBoxesState,
  fromBoxes.getBoxesEntities
);

export const getAllBoxes = createSelector(getBoxesEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getBoxesLoaded = createSelector(
  getBoxesState,
  fromBoxes.getBoxesLoaded
);

