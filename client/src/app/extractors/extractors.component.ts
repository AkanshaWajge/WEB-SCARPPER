import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ExtractorService } from './extarctors.service';
import { Extractor } from './extractors.module';

@Component({
  selector: 'app-extractors',
  templateUrl: './extractors.component.html',
  styleUrls: ['./extractors.component.css']
})
export class ExtractorsComponent implements OnInit {
  selectedExtractor = undefined;
  addExtractorPopupFlag = false;
  extractorDatalist: Extractor[] = [];
  editMode = false;
  error: string;

  constructor(private http: HttpClient, private service: ExtractorService) { }

  ngOnInit(): void {
    this.fetchExtractor();
  }

  addExtractorPopupHandler(iFlag) {
    this.addExtractorPopupFlag = iFlag;
  }

  selectExtractorHandler(iObject) {
    this.selectedExtractor = iObject;
    console.log('iObject', iObject);
  }

  createExtractorHandler(iInputValue) {
    if (iInputValue) {
      const arr = iInputValue.split('/');
      const result = arr[2];

      this.service.postExtractor({
        id: Date.now() + '',
        title: result,
        url: iInputValue,
      });

      this.fetchExtractor();

      console.log('this.extractorDatalist', this.extractorDatalist);
    }
    this.addExtractorPopupHandler(false);
  }

  callbackFromDetailsHandler(iAction) {
    switch (iAction) {
      case 'runInputs':
        this.runInputsHandler();
        break;

      case 'edit':
        this.editExtractorHandler();
        break;

      case 'delete':
        this.deleteExtractorHandler();
        break;

      default:
        console.log('default case');
    }
  }

  runInputsHandler() {
    console.log('connect to server');
    this.service.fetchExtractor(this.selectedExtractor.id).subscribe(res => {
      console.log('response received', res);
    }, error => console.log('oops', error));
  }

  editExtractorHandler() {
    this.editMode = true;
  }

  deleteExtractorHandler() {
    this.service.deleteExtractor(this.selectedExtractor.id).subscribe((response) => {
      console.log(response);
    });
    this.fetchExtractor();
  }

  fetchExtractor() {
    this.service.fetchExtractorList().subscribe((response) => {
      console.log(response);
      this.extractorDatalist = response;
    }, error => console.log('oops', error));
  }
}
