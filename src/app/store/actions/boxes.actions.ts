import { Action } from '@ngrx/store';

import { Box } from '@app/models';

export enum BoxesActionTypes {
  LoadBoxes = '[Root] LoadBoxes',
  LoadBoxesSuccess = '[Root] LoadBoxesSuccess',
  LoadBoxesFail = '[Root] LoadBoxesFail',
}

export class LoadBoxes implements Action {
  readonly type = BoxesActionTypes.LoadBoxes;
}

export class LoadBoxesSuccess implements Action {
  readonly type = BoxesActionTypes.LoadBoxesSuccess;
  constructor(public payload: Box[]) {}
}

export class LoadBoxesFail implements Action {
  readonly type = BoxesActionTypes.LoadBoxesFail;
  constructor(public payload: Error) {}
}

export type BoxesActions =
  LoadBoxes |
  LoadBoxesSuccess |
  LoadBoxesFail;
