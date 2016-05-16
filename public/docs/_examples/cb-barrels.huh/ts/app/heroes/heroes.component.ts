import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { HeroService, HeroDetailComponent, Hero } from './index';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes/heroes.component.html',
  styleUrls: ['app/heroes/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) { }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
