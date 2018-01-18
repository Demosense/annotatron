import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLabels from '../reducers/labels.reducer';

export const getLabelsState = createFeatureSelector<
  fromLabels.LabelState>('labels');

export const getLabelsEntities = createSelector(
  getLabelsState,
  fromLabels.getLabelsEntities
);

export const getAllLabels = createSelector(getLabelsEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getLabelsLoaded = createSelector(
  getLabelsState,
  fromLabels.getLabelsLoaded
);

