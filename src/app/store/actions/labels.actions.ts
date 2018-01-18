import { Action } from '@ngrx/store';

import { Label } from '@app/models';

export enum LabelsActionTypes {
  LoadLabels = '[Root] LoadLabels',
  RemoveLabels = '[Root] RemoveLabels',
}

export class LoadLabels implements Action {
  readonly type = LabelsActionTypes.LoadLabels;
  constructor(public payload: Label[]) {}
}

export class RemoveLabels implements Action {
  readonly type = LabelsActionTypes.RemoveLabels;
}

export type LabelsActions =
  LoadLabels |
  RemoveLabels;
