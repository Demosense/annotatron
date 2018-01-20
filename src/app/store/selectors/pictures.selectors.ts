import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPictures from '../reducers/pictures.reducer';
import * as fromLabels from '../selectors/labels.selectors';

import { Picture } from '@app/models';
import * as fromRouter from '@app/store/selectors/router.selectors';

export const getPicturesState = createFeatureSelector<
  fromPictures.PictureState>('pictures');

export const getPicturesEntities = createSelector(
  getPicturesState,
  fromPictures.getPicturesEntities
  );

export const getSelectedPicture = createSelector(
  getPicturesEntities,
  fromRouter.getRouterState,
  (entities, router): Picture => {
    return router.state && entities[router.state.params.pictureId];
  }
);

export const getAllPictures = createSelector(getPicturesEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getLabelledPictures = createSelector(
  getAllPictures,
  fromLabels.getAllLabels,
  (allPictures, allLabels) =>
    allPictures.map( ({ file, labels }) =>
        ({
          file,
          'labels':
            Object.keys(labels).map( key =>
              ({ name: allLabels[key].name, value: labels[key].value })
            ).reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
        })
    )
);

export const getPicturesLoaded = createSelector(
  getPicturesState,
  fromPictures.getPicturesLoaded
);

