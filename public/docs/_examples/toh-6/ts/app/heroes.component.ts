// #docplaster
// #docregion
import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
  }
  
  addHero(){
    this.addingHero = true;
    this.selectedHero = null;
  }
  
  // #docregion delete
  delete(hero:Hero, event:any){
    event.stopPropagation(); 
    this._heroService.delete(hero)
        .then(r => {
          this.heroes = this.heroes.filter(h => h.id !== hero.id);
        }
    );
  }
  // #enddocregion delete

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { 
    this.selectedHero = hero; 
    this.addingHero = false;
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
