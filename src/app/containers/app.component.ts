import { Component, HostListener } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/store';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar class="mat-elevation-z6">
      <span fxFlex></span>
      <app-toolbar-button icon="photo_library" (navigate)="navigateHome()" ></app-toolbar-button>
      <app-toolbar-button icon="mode_edit" (navigate)="navigateConfigure()" ></app-toolbar-button>
    </app-toolbar>
    <app-sidenav>
      <router-outlet></router-outlet>
    </app-sidenav>
  `,
})
export class AppComponent {
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return false;
  }

  constructor(private store: Store<fromRoot.State>) {}

  private navigateHome() {
    this.store.dispatch(new fromRoot.Go({ path: [''] }));
  }

  private navigateConfigure() {
    this.store.dispatch(new fromRoot.Go({ path: ['configure'] }));
  }
}
