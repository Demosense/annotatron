import * as fromPictures from '../actions';
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
      let index = 0;
      const entities = pictures.reduce(
        (collection: { [id: number]: Picture }, picture: Picture) => {
          return {
            ...collection,
            [index++]: picture,
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
  }
  return state;
}

