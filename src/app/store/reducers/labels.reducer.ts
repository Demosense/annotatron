import * as fromLabels from '../actions/labels.actions';
import { Label } from '@app/models';

export interface LabelState {
  entities: { [id: number]: Label };
  loaded: boolean;
}

const initialState: LabelState = {
  entities: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromLabels.LabelsActions
): LabelState {
  switch (action.type) {
    case fromLabels.LabelsActionTypes.LoadLabels: {
      const labels = action.payload;
      let index = -1;
      const entities = labels.reduce(
        (collection: { [id: number]: Label }, label: Label) => {
          index++;
          return {
            ...collection,
            [index]: { ...label, id: index },
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

    case fromLabels.LabelsActionTypes.RemoveLabels: {
      return initialState;
    }
  }
  return state;
}

export const getLabelsEntities = (state: LabelState) => state.entities;
export const getLabelsLoaded = (state: LabelState) => state.loaded;
