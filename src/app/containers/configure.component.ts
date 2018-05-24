import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store';

@Component({
  selector: 'app-configure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
     <mat-card-content>
       <app-configure-editor [configString]="configString$ | async" (saveConfig)="parseFile($event)" ></app-configure-editor>
     </mat-card-content>
    </mat-card>
  `,
  styles: [],
})
export class ConfigureComponent implements OnInit {
  configString$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.configString$ = this.store.pipe(
      select(fromRoot.getConfigurerConfigString)
    );
  }

  ngOnInit() {}

  parseFile(configString: string) {
    // We can do this because all actions are synchronous.
    this.store.dispatch(new fromRoot.RemoveBoxes());
    this.store.dispatch(new fromRoot.RemoveLabels());
    this.store.dispatch(new fromRoot.ParseConfig(configString));
  }
}
