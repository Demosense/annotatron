import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-remove-files-element',
  template: `
    <a mat-list-item>
      <mat-icon mat-list-icon>delete</mat-icon>
      <p mat-line>Remove Pictures</p>
    </a>
  `,
  styles: []
})
export class SidenavRemoveFilesElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
