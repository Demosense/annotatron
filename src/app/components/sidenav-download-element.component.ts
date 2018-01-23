import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-download-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a mat-list-item [href]="labelJsonUri" [download]="downloadName">
      <mat-icon mat-list-icon>file_download</mat-icon>
      <p mat-line>Download</p>
    </a>
  `,
  styles: []
})
export class SidenavDownloadElementComponent implements OnInit {

  @Input() labelJsonUri;
  @Input() downloadName;

  constructor() { }

  ngOnInit() {
  }

}
