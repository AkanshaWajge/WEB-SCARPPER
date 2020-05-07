import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-extractor',
  templateUrl: './add-extractor.component.html',
  styleUrls: ['./add-extractor.component.css']
})
export class AddExtractorComponent implements OnInit {

  @Output() onCreateExtractor = new EventEmitter<any>();
  inputUrl = '';

  constructor() {}

  ngOnInit(): void {}

  onClosePopup() {
    this.onCreateExtractor.emit('');
  }

  onCreate() {
    this.onCreateExtractor.emit(this.inputUrl);
  }

}
