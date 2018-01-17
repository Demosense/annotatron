import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px" >

      <mat-card>
        <mat-card-header>
          <mat-card-title>Picture Title</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-picture></app-picture>
        </mat-card-content>
        <mat-card-actions>
          <app-picture-button [icon]="'favorite'"></app-picture-button>
          <app-picture-button icon="favorite"></app-picture-button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-content>
          <mat-list>
            <mat-card-header>
              <mat-card-title>Box List</mat-card-title>
            </mat-card-header>

            <app-box-list-element></app-box-list-element>

            <mat-divider></mat-divider>

            <app-label-list-element></app-label-list-element>

          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
