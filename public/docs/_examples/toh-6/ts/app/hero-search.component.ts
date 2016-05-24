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
  search = new Subject<string>();
  heroes: Hero[] = [];

  constructor(private _heroSearchService: HeroSearchService, private _router: Router) {}

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this._router.navigate(link);
  }

  // #docregion search
  ngOnInit() {
    this.search.asObservable()
               .debounceTime(300)
               .distinctUntilChanged()
               .switchMap(term => term ? this._heroSearchService.search(term)
                                       : Observable.of([]))
               .subscribe(result => this.heroes = result,
                                    error => console.log(error));
  }
  // #enddocregion search
}
