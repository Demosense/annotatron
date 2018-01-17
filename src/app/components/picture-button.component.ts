import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-picture-button',
  template: `
    <button mat-icon-button>
      <mat-icon aria-label="Example icon-button with a heart icon">{{ icon }}</mat-icon>
    </button>
  `,
  styles: []
})
export class PictureButtonComponent implements OnInit {

  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
