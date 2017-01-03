// #docregion
/* avoid */

import { OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../shared/hero.model';

const heroesUrl = 'http://angular.io';

export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  constructor(private http: Http) {}

  getHeroes() {
    this.heroes = [];
    this.http.get(heroesUrl)
        .map((response: Response) => <Hero[]>response.json().data)
        .catch(this.catchBadResponse)
        .finally(() => this.hideSpinner())
        .subscribe((heroes: Hero[]) => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
    this.heroService.getHeroes().unsubscribe();
  }

  private catchBadResponse(err: any, source: Observable<any>) {
    // log and handle the exception
    return new Observable();
  }

  private hideSpinner() {
    // hide the spinner
  }
}
