import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar.component';
import { MainComponent } from './containers/main.component';
import { ToolbarButtonComponent } from './components/toolbar-button.component';
import { PictureComponent } from './components/picture.component';
import { BoxListElementComponent } from './components/box-list-element.component';
import { LabelListElementComponent } from './components/label-list-element.component';
import { PictureButtonComponent } from './components/picture-button.component';
import { SidenavComponent } from './containers/sidenav.component';
import { SidenavElementComponent } from './components/sidenav-element.component';

export const routes: Routes = [
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainComponent,
    ToolbarButtonComponent,
    PictureComponent,
    BoxListElementComponent,
    LabelListElementComponent,
    PictureButtonComponent,
    SidenavComponent,
    SidenavElementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
