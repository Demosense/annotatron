import * as fromBoxes from '../actions';
import { Box } from '@app/models';

export interface BoxState {
  entities: { [id: number]: Box };
  loaded: boolean;
  loading: boolean;
}

const initialState: BoxState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromBoxes.BoxesActions
): BoxState {
  switch (action.type) {
    case fromBoxes.BoxesActionTypes.LoadBoxes: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromBoxes.BoxesActionTypes.LoadBoxesSuccess: {
      const boxes = action.payload;

      const entities = boxes.reduce(
        (collection: { [id: number]: Box }, box: Box) => {
          return {
            ...collection,
            [box.id]: box,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromBoxes.BoxesActionTypes.LoadBoxesFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

