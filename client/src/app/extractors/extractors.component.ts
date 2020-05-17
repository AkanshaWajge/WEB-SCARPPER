import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


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
    // console.log('connect to server');
    // this.service.fetchExtractor(this.selectedExtractor.id).subscribe(res => {
    //   console.log('response received', res);
    // }, error => console.log('oops', error));


    console.log('coonect to server');
    let params = new HttpParams();
    params = params.append('url', this.selectedExtractor.url);
    params = params.append('runscript', this.selectedExtractor.runScript);
    const runInputObject = {
      id: 'ri' + Date.now(),
      time: new Date().toLocaleString(),
      status: -1 + '',
      responseData: []
    };
    const selectedExtractorIndex = this.extractorDatalist.findIndex(obj => this.selectedExtractor.id === obj.id);
    this.extractorDatalist[selectedExtractorIndex].runInputsData = [runInputObject];
    this.selectedExtractor = this.extractorDatalist[selectedExtractorIndex];
    const timeStart = Date.now();
    this.http.get<any>('http://localhost:3000/runextractor', { params: params }).subscribe(data => {
      console.log('response received', data);
      const timeEnd = Date.now();
      this.selectedExtractor.runInputsData[0].duration = this.msToTime(timeEnd - timeStart);
      this.selectedExtractor.runInputsData[0].status = 1;
      this.selectedExtractor.runInputsData[0].responseData = data;
      this.extractorDatalist[selectedExtractorIndex] = this.selectedExtractor;
    }, error => {
      console.log('oops', error);
      const timeEnd = Date.now();
      this.selectedExtractor.runInputsData[0].duration = this.msToTime(timeEnd - timeStart);
      this.selectedExtractor.runInputsData[0].status = 0;
      this.extractorDatalist[selectedExtractorIndex] = this.selectedExtractor;
    });
  }

  msToTime(duration: number) {
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
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
