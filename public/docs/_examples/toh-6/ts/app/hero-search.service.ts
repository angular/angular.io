// #docregion
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Hero }           from './hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) {}

  // #docregion observable-search
  search(term: string) {
    return this.http
               .get(`app/heroes/?name=${term}+`)
               .map((r: Response) => r.json().data as Hero[]);
  }
  // #enddocregion observable-search
}
