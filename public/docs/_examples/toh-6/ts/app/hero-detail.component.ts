// #docplaster
// #docregion, variables-imports
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

// #enddocregion variables-imports
import { ActivatedRoute } from '@angular/router';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
// #docregion variables-imports
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here
  // #enddocregion variables-imports

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  // #docregion ngOnInit
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
            .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }
  // #enddocregion ngOnInit

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // #docregion save
  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  // #enddocregion save
  // #docregion goBack
  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
  // #enddocregion goBack
}
