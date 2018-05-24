import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPictures from '../reducers/pictures.reducer';
import * as fromLabels from '../selectors/labels.selectors';
import * as fromBoxes from '../selectors/boxes.selectors';

import { Picture } from '@app/models';
import * as fromRouter from '@app/store/selectors/router.selectors';

export const getPicturesState = createFeatureSelector<
  fromPictures.PictureState
>('pictures');

export const getPicturesEntities = createSelector(
  getPicturesState,
  fromPictures.getPicturesEntities
);

export const getSelectedPicture = createSelector(
  getPicturesEntities,
  fromRouter.getRouterState,
  (entities, router): Picture => {
    return router.state && entities[router.state.params.currentPictureId];
  }
);

export const getAllPictures = createSelector(getPicturesEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getLabelledPictures = createSelector(
  getAllPictures,
  fromLabels.getAllLabels,
  fromBoxes.getAllBoxes,
  (allPictures, allLabels, allBoxes) =>
    allPictures.map(({ file, labels, boxes }) => ({
      file,
      labels: Object.keys(labels)
        .map(key => {
          const { name } = allLabels[key];
          const { value } = labels[key];
          return { name, value };
        })
        .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      boxes: Object.keys(boxes)
        .map(key => {
          const { name } = allBoxes[key];
          const { x0, y0, x1, y1 } = boxes[key];
          return { name, value: { x0, y0, x1, y1 } };
        })
        .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
    }))
);

export const getPicturesLoaded = createSelector(
  getPicturesState,
  fromPictures.getPicturesLoaded
);
