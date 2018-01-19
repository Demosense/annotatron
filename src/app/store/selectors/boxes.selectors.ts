import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBoxes from '../reducers/boxes.reducer';

export const getBoxesState = createFeatureSelector<
  fromBoxes.BoxState>('boxes');

export const getBoxesEntities = createSelector(
  getBoxesState,
  fromBoxes.getBoxesEntities
);

export const getAllBoxes = createSelector(getBoxesEntities, entities => {
  return Object.keys(entities).map(id => ({ id, ...entities[id] }));
});

export const getBoxesLoaded = createSelector(
  getBoxesState,
  fromBoxes.getBoxesLoaded
);

