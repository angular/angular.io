// #docregion , search
import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import { Hero }        from './hero';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  directives: [HeroSearchComponent]
})
// #enddocregion search
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
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
