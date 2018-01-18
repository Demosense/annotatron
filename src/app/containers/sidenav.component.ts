import { Component, OnInit } from '@angular/core';
import {SidenavElement} from '@app/models/sidenav-element';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav-container class="mat-elevation-z6">
      <mat-sidenav mode="side" opened="true" class="mat-elevation-z6">
        <mat-nav-list>
          <app-sidenav-upload-files-element
            [sidenavElement]="sidenavElement"
            (uploadImages)="onUploadFiles($event)">
          </app-sidenav-upload-files-element>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="10px">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
      padding-top: 15px;
    }
  `]

})
export class SidenavComponent implements OnInit {

  sidenavElement: SidenavElement = {
    name: 'Upload Pictures',
    icon: 'image'
  };

  constructor() { }

  ngOnInit() {
  }

  onUploadFiles(event: Event) {
    console.log(event);
    // this.store.dispatch(new fromStore.CreatePizza(event));
  }

}
