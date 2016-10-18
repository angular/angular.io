// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: 'app/hero-search.component.html',
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  // #docregion search
  heroes: Observable<Hero[]>;
  // #enddocregion search
  // #docregion searchSubject
  searchSubject = new Subject<string>();
  // #enddocregion searchSubject

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}
  // #docregion searchSubject

  // Push a search term into the observable stream.
  search(term: string) { this.searchSubject.next(term); }
  // #enddocregion searchSubject
  // #docregion search

  ngOnInit() {
    this.heroes = this.searchSubject
      .asObservable()           // cast as Observable
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))

      .catch(error => {
        // Todo: real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }
  // #enddocregion search

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
