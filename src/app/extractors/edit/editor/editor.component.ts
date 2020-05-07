import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

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