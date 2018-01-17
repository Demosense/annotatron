import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configure',
  template: `
    <mat-card>
     <mat-card-content>
       <form [formGroup]="form" >
         <mat-form-field>
        <textarea
          matInput
          formControlName="jsonFile"
          matTextareaAutosize
          matAutosizeMinRows="2"
          matAutosizeMaxRows="20" ></textarea>
         </mat-form-field>
         <div>
           <button 
             mat-button 
             (click)="parseFile()"
             color="primary" >Parse File</button>
         </div>
       </form>
     </mat-card-content>
    </mat-card>
  `,
  styles: []
})
export class ConfigureComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      jsonFile: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  parseFile() {
    console.log(JSON.parse(this.form.value.jsonFile));
  }

}
