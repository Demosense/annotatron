import { ConfigurationService } from './configuration.service';
import { OutputService } from './output.service';
import { PicturesService } from './pictures.service';

export const services: any[] = [
  ConfigurationService,
  OutputService,
  PicturesService,
];

export * from './configuration.service';
export * from './output.service';
export * from './pictures.service';
