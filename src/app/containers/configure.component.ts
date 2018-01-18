import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@app/store';

@Component({
  selector: 'app-configure',
  template: `
    <mat-card>
     <mat-card-content>
       <app-configure-editor [configString]="configString$ | async" (saveConfig)="parseFile($event)" ></app-configure-editor>
     </mat-card-content>
    </mat-card>
  `,
  styles: []
})
export class ConfigureComponent implements OnInit {

  configString$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.configString$ = this.store.select(fromRoot.getConfigurerConfigString);
  }

  ngOnInit() {
  }

  parseFile(configString: string) {
    // We can do this because all actions are synchronous.
    this.store.dispatch(new fromRoot.RemoveBoxes());
    this.store.dispatch(new fromRoot.RemoveLabels());
    this.store.dispatch(new fromRoot.ParseConfig(configString));
  }

}
