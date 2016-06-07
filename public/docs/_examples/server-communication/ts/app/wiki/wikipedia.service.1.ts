// Create the query string by hand
// #docregion
import { Injectable } from '@angular/core';
import { Jsonp }      from '@angular/http';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) { }

  // TODO: Add error handling
  search(term: string) {

    let wikiUrl = 'http://en.wikipedia.org/w/api.php';

    // #docregion query-string
    let queryString =
      `?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK`;

    return this.jsonp
               .get(wikiUrl + queryString)
               .map(request => <string[]> request.json()[1]);
    // #enddocregion query-string
  }
}
