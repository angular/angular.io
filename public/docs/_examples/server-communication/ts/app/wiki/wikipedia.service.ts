// #docregion
import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {

    var params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');

    let wikiUrl = 'http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';

    // TODO: Error handling
    return this.jsonp
               .get(wikiUrl, { search: params })
               .map(request => request.json()[1]);
  }
}
