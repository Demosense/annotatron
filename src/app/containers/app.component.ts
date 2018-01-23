import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/store/index';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar>
      <span class="spacer"></span>
      <app-toolbar-button icon="photo_library" (navigate)="navigateHome()" ></app-toolbar-button>
      <app-toolbar-button icon="mode_edit" (navigate)="navigateConfigure()" ></app-toolbar-button>
    </app-toolbar>
    <app-sidenav>
      <router-outlet></router-outlet>
    </app-sidenav>
  `
})
export class AppComponent {

  constructor(
    private store: Store<fromRoot.State>,
  ){}

  private navigateHome() {
   this.store.dispatch(new fromRoot.Go({ path: [''] }));
  }

  private navigateConfigure() {
    this.store.dispatch(new fromRoot.Go({ path: ['configure'] }));
  }
}
