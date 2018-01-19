import { Action } from '@ngrx/store';

import { LabelValue, Picture } from '@app/models';

export enum PicturesActionTypes {
  LoadPictures = '[Root] LoadPictures',
  LoadPicturesSuccess = '[Root] LoadPicturesSuccess',
  LoadPicturesFail = '[Root] LoadPicturesFail',
  UpdateLabel = '[Root] UpdateLabel',
}

export class LoadPictures implements Action {
  readonly type = PicturesActionTypes.LoadPictures;
}

export class LoadPicturesSuccess implements Action {
  readonly type = PicturesActionTypes.LoadPicturesSuccess;
  constructor(public payload: Picture[]) {}
}

export class LoadPicturesFail implements Action {
  readonly type = PicturesActionTypes.LoadPicturesFail;
  constructor(public payload: Error) {}
}

export class UpdateLabel implements Action {
  readonly type = PicturesActionTypes.UpdateLabel;
  constructor(public payload: { pictureId: number, labelValue: LabelValue }) {}
}

export type PicturesActions =
  LoadPictures |
  LoadPicturesSuccess |
  LoadPicturesFail |
  UpdateLabel;
