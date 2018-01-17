import { Action } from '@ngrx/store';

import { Label } from '@app/models';

export enum LabelsActionTypes {
  LoadLabels = '[Root] LoadLabels',
  LoadLabelsSuccess = '[Root] LoadLabelsSuccess',
  LoadLabelsFail = '[Root] LoadLabelsFail',
}

export class LoadLabels implements Action {
  readonly type = LabelsActionTypes.LoadLabels;
}

export class LoadLabelsSuccess implements Action {
  readonly type = LabelsActionTypes.LoadLabelsSuccess;
  constructor(public payload: Label[]) {}
}

export class LoadLabelsFail implements Action {
  readonly type = LabelsActionTypes.LoadLabelsFail;
  constructor(public payload: Error) {}
}

export type LabelsActions =
  LoadLabels |
  LoadLabelsSuccess |
  LoadLabelsFail;
