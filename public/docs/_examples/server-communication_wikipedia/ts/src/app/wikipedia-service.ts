// #docregion
import {Inject} from 'angular2/angular2';
import {Jsonp, URLSearchParams} from 'angular2/http';

export class WikipediaService {
  //FIXME: Figure out why it doesn't work with @Injectable()
  constructor(@Inject(Jsonp) private jsonp: Jsonp) {}

  search (term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((request) => request.json()[1])
  }

}
// #enddocregion
