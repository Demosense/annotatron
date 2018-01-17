import * as fromLabels from '../actions';
import { Label } from '@app/models';

export interface LabelState {
  entities: { [id: number]: Label };
  loaded: boolean;
  loading: boolean;
}

const initialState: LabelState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromLabels.LabelsActions
): LabelState {
  switch (action.type) {
    case fromLabels.LabelsActionTypes.LoadLabels: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromLabels.LabelsActionTypes.LoadLabelsSuccess: {
      const labels = action.payload;

      const entities = labels.reduce(
        (collection: { [id: number]: Label }, label: Label) => {
          return {
            ...collection,
            [label.id]: label,
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

    case fromLabels.LabelsActionTypes.LoadLabelsFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

