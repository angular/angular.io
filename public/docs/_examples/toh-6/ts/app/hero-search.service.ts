// #docregion
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class HeroSearchService {

  constructor(private _http: Http) {}

  // #docregion observable-search
  search(term: string) {
    return this._http
               .get(`app/heroes/?name=${term}+`)
               .map((r: Response) => r.json().data);
  }
  // #enddocregion observable-search
}
