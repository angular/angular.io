import { Component, OnInit } from '@angular/core';

import { Hero, HeroService } from './heroes';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  deleteHero(hero: Hero) {
    this.heroes = this.heroes.filter((element) => {
      return element.id !== hero.id;
    });
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
