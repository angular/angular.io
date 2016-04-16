// #docregion
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// #docregion phonedata-interface
export interface PhoneData {
  name: string;
  snippet: string;
  images: string[];
}
// #enddocregion phonedata-interface

// #docregion class
// #docregion fullclass
@Injectable()
export class Phone {
// #enddocregion class

  constructor(private http: Http) { }

  query():Observable<PhoneData[]> {
    return this.http.get(`phones/phones.json`)
      .map((res:Response) => res.json());
  }

  get(id: string):Observable<PhoneData> {
    return this.http.get(`phones/${id}.json`)
      .map((res:Response) => res.json());
  }
// #docregion class
}
// #enddocregion fullclass
// #enddocregion class
