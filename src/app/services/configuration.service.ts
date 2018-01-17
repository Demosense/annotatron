import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Box, Label } from '@app/models';

@Injectable()
export class ConfigurationService {

  constructor() { }

  public getLabels(): Observable<Label[]> {
    return;
  }

  public getBoxes(): Observable<Box[]> {
    return;
  }
}
