// #docregion imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Hero, HeroService } from './heroes/index';

@Component({
// #enddocregion
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private _router: Router) { }

  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
