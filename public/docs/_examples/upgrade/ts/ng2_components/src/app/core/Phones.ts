// #docregion full
import {Injectable, Observable} from 'angular2/angular2';
import {Http, Response} from 'angular2/http';

// #docregion phone-interface
export interface Phone {
  name: string;
  snippet: string;
  images: string[];
}
// #enddocregion phone-interface

// #docregion fullclass
// #docregion class
@Injectable()
export class Phones {
// #enddocregion class

  constructor(private http: Http) { }

  query():Observable<Phone[]> {
    return this.http.get(`phones/phones.json`)
      .map((res:Response) => res.json());
  }

  get(id: string):Observable<Phone> {
    return this.http.get(`phones/${id}.json`)
      .map((res:Response) => res.json());
  }

// #docregion class
}
// #enddocregion class
// #enddocregion fullclass
// #docregion full
