import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Picture } from '@app/models';

@Injectable()
export class PicturesService {

  constructor() { }

  public getPictures(): Observable<Picture[]> {
    return;
  }
}
