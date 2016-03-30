// #docregion
import {Component, Input, OnInit} from 'angular2/core';

import {Hero}                     from './hero';
import {HeroCacheService}         from './hero-cache.service';

// #docregion component
@Component({
  selector:'hero-bio',
  // #docregion template
  template:`
    <h4>{{hero.name}}</h4>
    <ng-content></ng-content>
    <textarea cols="25" [(ngModel)]="hero.description"></textarea>`,
  // #enddocregion template
  providers: [HeroCacheService]
})

export class HeroBioComponent implements OnInit  {

  @Input() heroId:number;

  constructor(private _heroCache:HeroCacheService) { }

  ngOnInit() { this._heroCache.fetchCachedHero(this.heroId); }

  get hero() { return this._heroCache.hero; }
}
// #enddocregion component
