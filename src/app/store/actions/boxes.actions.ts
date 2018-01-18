import { Action } from '@ngrx/store';

import { Box } from '@app/models';

export enum BoxesActionTypes {
  LoadBoxes = '[Root] LoadBoxes',
  RemoveBoxes = '[Root] RemoveBoxes',
}

export class LoadBoxes implements Action {
  readonly type = BoxesActionTypes.LoadBoxes;
  constructor(public payload: Box[]) {}
}

export class RemoveBoxes implements Action {
  readonly type = BoxesActionTypes.RemoveBoxes;
}

export type BoxesActions =
  LoadBoxes |
  RemoveBoxes;
