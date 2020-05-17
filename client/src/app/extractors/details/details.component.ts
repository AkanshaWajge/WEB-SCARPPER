import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() selectedExtractor: any;
  @Output() callbackParent = new EventEmitter<any>();

  constructor(private excelService: ExcelService) {}

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

  onDownload(iObject){
    console.log("download excel sheet");
    this.excelService.exportAsExcelFile(iObject.responseData, 'sample');

  }

}
