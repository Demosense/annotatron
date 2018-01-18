import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SidenavElement } from '@app/models/sidenav-element';

@Component({
  selector: 'app-sidenav-upload-files-element',
  template: `
    <a mat-list-item (click)="selectFile()">
      <mat-icon mat-list-icon>{{ sidenavElement.icon }}</mat-icon>
      <p mat-line>{{ sidenavElement.name }}</p>
      <input id="uploadFiles" type="file" (change)="onSelectFiles($event)" multiple #inputFile style="display: none">
    </a>
  `,
  styles: []
})
export class SidenavUploadFilesElementComponent implements OnInit {
  @Input() sidenavElement: SidenavElement;
  @Output() uploadImages = new EventEmitter<any>();
  @ViewChild('inputFile') nativeInputFile: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public onSelectFiles(event) {
    this.uploadImages.emit(event.target.files);
    // for (const f of event.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(f);
    //   reader.onload = (e) => {
    //     this.urls.push(e.target.result);
    //   };
    // }
  }

  public selectFile() {
    this.nativeInputFile.nativeElement.click();
  }
}

