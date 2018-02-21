import * as fromPictures from '../actions/pictures.actions';
import { Picture } from '@app/models';

export interface PictureState {
  entities: { [id: number]: Picture };
  loaded: boolean;
  loading: boolean;
}

const initialState: PictureState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromPictures.PicturesActions
): PictureState {
  switch (action.type) {
    case fromPictures.PicturesActionTypes.LoadPictures: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPictures.PicturesActionTypes.LoadPicturesSuccess: {
      const pictures = action.payload;
      let index = -1;
      const entities = pictures.reduce(
        (collection: { [id: number]: Picture }, picture: Picture) => {
          index++;
          return {
            ...collection,
            [index]: { ...picture, id: index },
          };
        },
        {} // Remove all previous entities
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromPictures.PicturesActionTypes.LoadPicturesFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromPictures.PicturesActionTypes.UpdateLabel: {
      // Get current state slices
      const { pictureId, labelValue } = action.payload;
      const { entities } = state;
      const picture = entities[pictureId];

      // Check existence
      if (!picture) {
        return state;
      }

      const modEntities = {
        ...entities,
        [pictureId]: {
          ...picture,
          labels: {
            ...picture.labels,
            [labelValue.id]: labelValue,
          },
        },
      };
      return {
        ...state,
        entities: modEntities,
      };
    }

    case fromPictures.PicturesActionTypes.UpdateBox: {
      // Get current state slices
      const { pictureId, boxValue } = action.payload;
      const { entities } = state;
      const picture = entities[pictureId];

      // Check existence
      if (!picture) {
        return state;
      }

      const modEntities = {
        ...entities,
        [pictureId]: {
          ...picture,
          boxes: {
            ...picture.boxes,
            [boxValue.id]: boxValue,
          },
        },
      };
      return {
        ...state,
        entities: modEntities,
      };
    }

    case fromPictures.PicturesActionTypes.RemovePicture: {
      const { pictureId, previousPictureId } = action.payload;
      const { [pictureId]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}

export const getPicturesEntities = (state: PictureState) => state.entities;
export const getPicturesLoaded = (state: PictureState) => state.loaded;
