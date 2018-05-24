import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSliderModule,
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSliderModule,
];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ...materialModules],
  exports: [FlexLayoutModule, ...materialModules],
  declarations: [],
})
export class SharedModule {}
