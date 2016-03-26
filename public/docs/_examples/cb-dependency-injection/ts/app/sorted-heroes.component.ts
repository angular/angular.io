// #docregion
import {Component}        from 'angular2/core';
import {SortedHeroesBase} from './sorted-heroes-base';
import {HeroService}      from './hero.service';

@Component({
  selector:'sorted-heroes',
  template:`<div *ngFor="#hero of sortedHeroes">{{hero.name}}</div>`,
  providers:[HeroService]
})

export class SortedHeroes extends SortedHeroesBase{
  constructor(heroService:HeroService){
    super(heroService);
  }
}