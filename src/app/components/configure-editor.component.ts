import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configure-editor',
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <textarea
          matInput
          [formControlName]="FORM_CONTROL_CONFIG_STRING"
          matTextareaAutosize
          matAutosizeMinRows="2"
          matAutosizeMaxRows="20" ></textarea>
      </mat-form-field>
      <div>
        <button
          mat-raised-button
          (click)="save()"
          color="primary">Parse File</button>
      </div>
    </form>
  `,
  styles: []
})
export class ConfigureEditorComponent implements OnInit {

  readonly FORM_CONTROL_CONFIG_STRING: string = 'configString';

  form: FormGroup;

  @Input() set configString(value: string) {
    this.form.patchValue({ [this.FORM_CONTROL_CONFIG_STRING]: value || '' }, { emitEvent: false });
  }

  @Output() saveConfig = new EventEmitter<string>();

  constructor() {
    this.form = new FormGroup({
      [this.FORM_CONTROL_CONFIG_STRING]: new FormControl(),
    });
  }

  ngOnInit() {
  }

  private save() {
    this.saveConfig.emit(this.form.value[this.FORM_CONTROL_CONFIG_STRING]);
  }
}
