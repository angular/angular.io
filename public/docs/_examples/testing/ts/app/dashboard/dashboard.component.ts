// #docregion
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero, HeroService } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls:  [
    'app/shared/styles.css',
    'app/dashboard/dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let link = `../heroes/${hero.id}`;
    this.router.navigate([link]);
  }

  get title() {
    let cnt = this.heroes.length;
    return cnt === 0 ? 'No Heroes' :
      cnt === 1 ? 'Top Hero' :  `Top ${cnt} Heroes`;
  }
}
