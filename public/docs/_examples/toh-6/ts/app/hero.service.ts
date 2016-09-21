// #docplaster
// #docregion , imports
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

// #docregion rxjs
import 'rxjs/add/operator/toPromise';
// #enddocregion rxjs

import { Hero } from './hero';
// #enddocregion imports

@Injectable()
export class HeroService {

  // #docregion update
  private headers = new Headers({'Content-Type': 'application/json'});
  // #enddocregion update
  // #docregion getHeroes
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    // #docregion to-promise
               .toPromise()
    // #enddocregion to-promise
    // #docregion to-data
               .then(response => response.json().data as Hero[])
    // #enddocregion to-data
    // #docregion catch
               .catch(this.handleError);
    // #enddocregion catch
  }
  // #enddocregion getHeroes

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }

  // #docregion delete
  delete(id: number): Promise<void> {
    let url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  // #enddocregion delete

  // #docregion create
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  // #enddocregion create
  // #docregion update

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  // #enddocregion put, update

  // #docregion handleError
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  // #enddocregion handleError
}

