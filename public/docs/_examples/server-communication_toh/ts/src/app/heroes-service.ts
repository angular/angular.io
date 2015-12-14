// #docregion
import {Inject} from 'angular2/angular2';
import {Http} from 'angular2/http';

export class HeroesService {
  //FIXME: Figure out why it doesn't work with @Injectable()
  constructor (@Inject(Http) private http: Http) {}

  // #docregion getheroes
  getHeroes () {
    return this.http.get('/heroes').map(res => res.json().items);
  }
  // #enddocregion getheroes
}
// #enddocregion
