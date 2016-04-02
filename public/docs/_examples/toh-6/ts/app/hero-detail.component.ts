// #docplaster
// #docregion
import { Component, Input, Output, OnInit, EventEmitter } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() updateHeroes = new EventEmitter();

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  // #docregion ngOnInit
  ngOnInit() {
    if(this._routeParams.get('id') !== null){
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id)
          .then(hero => this.hero = hero);
    }
    else{
      this.hero = new Hero();
    }
  }
  // #enddocregion ngOnInit
  // #docregion save
  save(){
    this._heroService.save(this.hero)
        .then(r => {
          this.updateHeroes.emit(r);
        });
  }
  // #enddocregion save
  goBack() {
    window.history.back();
  }
}

