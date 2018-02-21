import * as fromBoxes from '../actions/boxes.actions';
import { Box } from '@app/models';

export interface BoxState {
  entities: { [id: number]: Box };
  loaded: boolean;
  selectedBox: Box;
}

const initialState: BoxState = {
  entities: {},
  loaded: false,
  selectedBox: null,
};

export function reducer(
  state = initialState,
  action: fromBoxes.BoxesActions
): BoxState {
  switch (action.type) {
    case fromBoxes.BoxesActionTypes.LoadBoxes: {
      const boxes = action.payload;
      let index = 0;
      const entities = boxes.reduce(
        (collection: { [id: number]: Box }, box: Box) => {
          return {
            ...collection,
            [index++]: box,
          };
        },
        {} // Remove all previous entities
      );

      return {
        ...state,
        loaded: true,
        entities,
      };
    }

    case fromBoxes.BoxesActionTypes.RemoveBoxes: {
      return initialState;
    }

    case fromBoxes.BoxesActionTypes.SelectedBox: {
      const selectedBox = action.payload;
      return {
        ...state,
        selectedBox,
      };
    }
  }
  return state;
}

export const getBoxesEntities = (state: BoxState) => state.entities;
export const getBoxesLoaded = (state: BoxState) => state.loaded;
export const getSelectedBox = (state: BoxState) => state.selectedBox;
