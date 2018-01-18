import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Box, Label } from '@app/models';

@Injectable()
export class ConfigurationService {

  constructor() { }

  /**
   * Parses a JSON formatted string into a collection of labels and boxes according to the
   * specific models.
   *
   * @param {string} configString JSON formatted string. Must contain two array props called labels and boxes
   * @returns {{labels: Label[]; boxes: Box[]}}
   */
  public parseConfigString(configString: string): { labels: Label[], boxes: Box[] } {
    const collection = JSON.parse(configString);
    const { labels, boxes } = collection;

    if (!Array.isArray(labels)) {
      throw new Error('Config must contain labels property as an array of valid labels');
    }
    if (!Array.isArray(boxes)) {
      throw new Error('Config must contain boxes property as an array of valid boxes');
    }

    return { labels, boxes };
  }

}
