import { Action } from '@ngrx/store';

export enum ConfigurerActionsTypes {
  ParseConfig = '[Root] ParseConfig',
  ParseConfigSuccess = '[Root] ParseConfigSuccess',
  ParseConfigFail = '[Root] ParseConfigFail',
}

export class ParseConfig implements Action {
  readonly type = ConfigurerActionsTypes.ParseConfig;
  constructor(public payload: string) {}
}

export class ParseConfigSuccess implements Action {
  readonly type = ConfigurerActionsTypes.ParseConfigSuccess;
}

export class ParseConfigFail implements Action {
  readonly type = ConfigurerActionsTypes.ParseConfigFail;
  constructor(public payload: Error) {}
}

export type ConfigurerParserActions =
  ParseConfig |
  ParseConfigSuccess |
  ParseConfigFail;
