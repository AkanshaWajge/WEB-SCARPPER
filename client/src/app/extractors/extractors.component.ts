import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-extractors',
  templateUrl: './extractors.component.html',
  styleUrls: ['./extractors.component.css']
})
export class ExtractorsComponent implements OnInit {
  selectedExtractor = undefined;
  addExtractorPopupFlag = false;
  extractorDatalist: any = [];
  editMode = false;
  error: string

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/list').subscribe((response) => {
      if (response["success"] == "true") {
        console.log(response);
        this.extractorDatalist = response["data"];
      } else {
        this.error = response["message"]
      }
    }, error => console.log('oops', error));
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

  runInputsHandler() {
    console.log("connect to server");
    this.http.get<any>("http://localhost:3000/api/" + this.selectedExtractor.id).subscribe(res => {
      console.log("response received", res);
    }, error => console.log('oops', error));
  }

  editExtractorHandler() {
    this.editMode = true;
  }

  deleteExtractorHandler() { }

}
