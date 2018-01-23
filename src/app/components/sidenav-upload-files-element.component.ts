import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav-upload-files-element',
  template: `
    <a mat-list-item (click)="selectFile()">
      <mat-icon mat-list-icon>image</mat-icon>
      <p mat-line>Upload Pictures</p>
      <input type="file" (change)="uploadPictures($event)" multiple #inputFiles>
    </a>
  `,
  styles: []
})
export class SidenavUploadFilesElementComponent implements OnInit {

  @Output() upload = new EventEmitter<any>();
  @ViewChild('inputFiles') nativeInputFile: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public uploadPictures(event) {
    this.upload.emit(event);
  }

  public selectFile() {
    this.nativeInputFile.nativeElement.click();
  }
}

