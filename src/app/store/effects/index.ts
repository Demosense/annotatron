import { ConfigurerEffects } from './configurer.effects';
import { RouterEffects } from './router.effects';
import { PicturesEffects } from './pictures.effects';

export const effects: any[] = [
  ConfigurerEffects,
  RouterEffects,
  PicturesEffects,
];

export * from './router.effects';
export * from './configurer.effects';
export * from './pictures.effects';
