import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


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
    console.log("coonect to server");
    let params = new HttpParams();
    params = params.append('url', this.selectedExtractor.url);
    params = params.append('runscript', this.selectedExtractor.runScript);
    let runInputObject: any = {
      id: "ri" + Date.now(),
      time: new Date().toLocaleString(),
      status: -1,
      responseData: []
    };
    let selectedExtractorIndex = this.extractorDatalist.findIndex(obj => this.selectedExtractor.id === obj.id);
    this.extractorDatalist[selectedExtractorIndex].runInputsData.unshift(runInputObject);
    this.selectedExtractor = this.extractorDatalist[selectedExtractorIndex];
    let timeStart = Date.now();
    this.http.get<any>("http://localhost:3000/runextractor", { params: params }).subscribe(data => {
      console.log("response received", data);
      let timeEnd = Date.now();
      this.selectedExtractor.runInputsData[0].duration = this.msToTime(timeEnd - timeStart);
      this.selectedExtractor.runInputsData[0].status = 1;
      this.selectedExtractor.runInputsData[0].responseData = data;
      this.extractorDatalist[selectedExtractorIndex] = this.selectedExtractor;
    }, error => {
      console.log('oops', error);
      let timeEnd = Date.now();
      this.selectedExtractor.runInputsData[0].duration = this.msToTime(timeEnd - timeStart);
      this.selectedExtractor.runInputsData[0].status = 0;
      this.extractorDatalist[selectedExtractorIndex] = this.selectedExtractor;
    });
  }

  msToTime(duration: number) {
    var seconds: any = Math.floor((duration / 1000) % 60);
    var minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    var hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  editExtractorHandler() {
    this.editMode = true;
  }

  deleteExtractorHandler() { }

}
