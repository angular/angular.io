// #docplaster
// #docregion
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  template: `
    <div *ngIf="loading">
      Loading Hero...
    </div>
    <div *ngIf="hero$ | async">
      <h3>HEROES</h3>
      <div>
        <label>Id: </label>{{ (hero$ | async)?.id }}
      </div>
      <div>
        <label>Name: </label>
        <input placeholder="name" [value]="(hero$ | async)?.name"/>
      </div>
    </div>
    <div *ngIf="error">
      No hero found
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  hero$: BehaviorSubject<Hero> = new BehaviorSubject(null);
  loading: boolean = true;
  error: boolean;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .do(() => this.loading = true)
      .switchMap((params: Params) =>
        this.heroService.getHero(params['id'])
          .catch(error => {
            this.error = true;

            return Observable.of(null);
          })
      )
      .do(() => this.loading = false)
      .subscribe(this.hero$);
  }
}
