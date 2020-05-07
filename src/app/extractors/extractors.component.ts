import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extractors',
  templateUrl: './extractors.component.html',
  styleUrls: ['./extractors.component.css']
})
export class ExtractorsComponent implements OnInit {
  selectedExtractor = undefined;
  addExtractorPopupFlag = false;
  extractorDatalist: any = [
    {
      id: JSON.stringify(Date.now()),
      title: "amazon.com",
      url: "https://www.amazon.com/find-your-store/b/?node=17608448011",
    },
    {
      id: JSON.stringify(Date.now()),
      title: "amazon.com",
      url: "https://www.amazon.com/find-your-store/b/?node=17608448011",
    }
  ];
  editMode = false;

  constructor() {}

  ngOnInit(): void {}

  addExtractorPopupHandler(iFlag) {
    this.addExtractorPopupFlag = iFlag;
  }

  selectExtractorHandler(iObject) {
    this.selectedExtractor = iObject;
    console.log('iObject', iObject);
  }

  createExtractorHandler(iInputValue) {
    if (iInputValue) {
      var arr = iInputValue.split('/');
      var result = arr[2];

      this.extractorDatalist.push({
        id: JSON.stringify(Date.now()),
        title: result,
        url: iInputValue,
      });

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

  runInputsHandler() { }

  editExtractorHandler() {
    this.editMode = true;
  }

  deleteExtractorHandler() { }

}
