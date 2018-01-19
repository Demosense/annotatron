import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPictures from '../reducers/pictures.reducer';

export const getPicturesState = createFeatureSelector<
  fromPictures.PictureState>('pictures');

export const getPicturesEntities = createSelector(
  getPicturesState,
  fromPictures.getPicturesEntities
  );

export const getAllPicutres = createSelector(getPicturesEntities, entities => {
  return Object.keys(entities).map(id => ({ id, ...entities[id] }));
});

export const getPicturesLoaded = createSelector(
  getPicturesState,
  fromPictures.getPicturesLoaded
);

