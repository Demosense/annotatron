import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-list-element',
  template: `
    <a mat-list-item>
      <mat-icon mat-list-icon>folder</mat-icon>
      <span>Box</span>
    </a>
  `,
  styles: []
})
export class BoxListElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
