import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }
  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      variable: new FormControl(null),
      input: new FormControl(null),
      code_snippet: new FormControl(null)
    })
  }

  onSubmit(event: FormGroup): void {
    console.log(event)
  }

}
