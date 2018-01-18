import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Box, Label } from '@app/models';

@Injectable()
export class ConfigurationService {

  constructor() { }

  public parseConfigString(configString: string): { labels: Label[], boxes: Box[] } {
    const collection = JSON.parse(configString);
    console.log(collection);
    const { labels, boxes } = collection;
    console.log(labels);
    console.log(boxes);
    return { labels, boxes };
  }

  public getLabels(): Observable<Label[]> {
    return;
  }

  public getBoxes(): Observable<Box[]> {
    return;
  }
}
