import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() selectedExtractor: any;
  @Output() callbackParent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onRunInput() {
    this.callbackParent.emit('runInputs');
  }

  onEdit() {
    this.callbackParent.emit('edit');
  }

  onDelete() {
    this.callbackParent.emit('delete');
  }

}
