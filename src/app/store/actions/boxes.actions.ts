import { Action } from '@ngrx/store';

import { Box } from '@app/models';

export enum BoxesActionTypes {
  LoadBoxes = '[Root] LoadBoxes',
  RemoveBoxes = '[Root] RemoveBoxes',
  SelectedBox = '[Root] SelectedBox',
}

export class LoadBoxes implements Action {
  readonly type = BoxesActionTypes.LoadBoxes;
  constructor(public payload: Box[]) {}
}

export class RemoveBoxes implements Action {
  readonly type = BoxesActionTypes.RemoveBoxes;
}

export class SelectedBox implements Action {
  readonly type = BoxesActionTypes.SelectedBox;
  constructor(public payload: Box) {}
}

export type BoxesActions =
  LoadBoxes |
  RemoveBoxes |
  SelectedBox;
