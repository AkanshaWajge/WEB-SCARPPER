import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extractor } from './extractors.module';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ExtractorService {
  constructor(private http: HttpClient) { }

  postExtractor(extractor: Extractor) {
    this.http.put<{ success: string, message: string, data?: { string: Extractor } }>(
      'http://localhost:3000/api/add', extractor
    ).subscribe(data => {
      console.log(data);
    });
  }

  fetchExtractorList() {
    return this.http.get<{ success: string, message: string, data?: { string: Extractor } }>(
      'http://localhost:3000/api/list'
    ).pipe(map((response) => {
      // convert response data to array
      const arr = [];
      console.log('response', response);
      const keys = Object.keys(response.data);
      for (const i of keys) {
        console.log(i);
        if (response.data.hasOwnProperty(i)) {
          arr.push(response.data[i]);
        }
      }
      return arr;
    }));
  }

  fetchExtractor(id) {
    return this.http.get<any>('http://localhost:3000/api/' + id);
  }

  deleteExtractor(id) {
    return this.http.delete<{ success: string, message: string, data?: { string: Extractor } }>('http://localhost:3000/api/delete/' + id);
  }
}
