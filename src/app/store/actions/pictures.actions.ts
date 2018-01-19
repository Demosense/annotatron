  import { Action } from '@ngrx/store';

import { Picture, PictureUpload } from '@app/models';

export enum PicturesActionTypes {
  LoadPictures = '[Root] LoadPictures',
  LoadPicturesSuccess = '[Root] LoadPicturesSuccess',
  LoadPicturesFail = '[Root] LoadPicturesFail',
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

export type PicturesActions =
  LoadPictures |
  LoadPicturesSuccess |
  LoadPicturesFail;
