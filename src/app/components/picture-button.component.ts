import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-picture-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button (click)="onChangePicture()">
      <mat-icon aria-label="Example icon-button with a heart icon">{{ icon }}</mat-icon>
    </button>
  `,
  styles: [],
})
export class PictureButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() numKey: number;
  @Output() changePicture = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public onChangePicture() {
    this.changePicture.emit();
  }

  @HostListener('window:keydown', ['$event'])
  private hotkeys(event) {
    if (event.keyCode === this.numKey) {
      this.changePicture.emit();
    }
  }
}
