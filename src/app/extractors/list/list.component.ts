import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() onAddExtractor = new EventEmitter<any>();

  @Output() onSelectExtractor = new EventEmitter<any>();

  @Input() extractorList: any;

  constructor() {}

  ngOnInit(): void {}

  addExtractor() {
    this.onAddExtractor.emit(true);
    console.log('called');
  }

  selectExtractor(iObject){
    this.onSelectExtractor.emit(iObject); 
  }

}
