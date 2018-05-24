import * as fromConfigurer from '../actions/configurer.actions';

export interface ConfigurerState {
  confString: string;
  parsing: boolean;
  parsed: boolean;
  error: string;
}

const initialState: ConfigurerState = {
  confString: '',
  parsing: false,
  parsed: false,
  error: '',
};

export function reducer(
  state = initialState,
  action: fromConfigurer.ConfigurerParserActions
): ConfigurerState {
  switch (action.type) {
    case fromConfigurer.ConfigurerActionsTypes.ParseConfig:
      return {
        ...state,
        confString: action.payload,
        parsing: true,
        error: '',
      };

    case fromConfigurer.ConfigurerActionsTypes.ParseConfigSuccess:
      return {
        ...state,
        parsing: false,
        parsed: true,
        error: '',
      };

    case fromConfigurer.ConfigurerActionsTypes.ParseConfigFail:
      return {
        ...state,
        parsing: false,
        parsed: false,
        error: action.payload.message,
      };
  }

  return state;
}

export const getConfigurerConfigString = (state: ConfigurerState) =>
  state.confString;
export const getConfigurerParsing = (state: ConfigurerState) => state.parsing;
export const getConfigurerParsed = (state: ConfigurerState) => state.parsed;
export const getConfigurerError = (state: ConfigurerState) => state.error;
