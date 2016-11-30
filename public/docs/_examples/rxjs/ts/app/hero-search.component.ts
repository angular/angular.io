// #docplaster
// #docregion
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/merge';
import { Component, OnInit, OnDestroy }   from '@angular/core';
import { FormBuilder, FormGroup }         from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable }                     from 'rxjs/Observable';
import { Subject }                        from 'rxjs/Subject';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  templateUrl: 'hero-search.component.html',
  styleUrls: [ 'hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  heroes$: Observable<Hero[]>;
  destroy$: Subject<any> = new Subject();
  form: FormGroup;

  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchTerms: ['']
    });

    const searchTerms$: Observable<string> = this.form.valueChanges
      .debounceTime(300)
      .map(model => model.searchTerms);

    const querySearch$: Observable<string> = this.route.queryParams
      .map((params: Params) => params['q'])
      .do(searchTerms => this.form.patchValue({
        searchTerms
      }));

    this.heroes$ = Observable.merge(searchTerms$, querySearch$)
      .distinctUntilChanged()
      .takeUntil(this.destroy$)
      .do(q => this.router.navigate(['./'], { queryParams: { q }, relativeTo: this.route }))
      .switchMap((term: string) => term
        ? this.heroService.search(term)
        : Observable.of([])
      )
      .catch(error => {
        return Observable.of([]);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
