import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar>
      <app-toolbar-button icon="folder" (navigate)="console.log()" ></app-toolbar-button>
    </app-toolbar>
    <app-sidenav>
      <router-outlet></router-outlet>
    </app-sidenav>
  `
})
export class AppComponent {
}
