// #docplaster
// #docregion
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

// #docregion rxjs
import 'rxjs/add/operator/toPromise';
// #enddocregion rxjs

import { Hero } from './hero';

@Injectable()
export class HeroService {

  // #docregion getHeroes
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    // #docregion to-promise
               .toPromise()
    // #enddocregion to-promise
    // #docregion to-data
               .then(response => response.json().data)
    // #enddocregion to-data
    // #docregion catch
               .catch(this.handleError);
    // #enddocregion catch
  }
  // #enddocregion getHeroes

  getHero(id: number) {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }

  // #docregion save
  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }
  // #enddocregion save

  // #docregion delete
  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }
  // #enddocregion delete

  // #docregion post
  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }
  // #enddocregion post

  // #docregion put
  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }
  // #enddocregion put

  // #docregion handleError
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  // #enddocregion handleError
}

