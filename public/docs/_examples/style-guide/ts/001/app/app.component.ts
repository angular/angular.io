// #docplaster

// #docregion
/* recommended */

// app.component.ts
import { Component, OnInit } from 'angular2/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  template: `
      <pre>{{heroes | json}}</pre>  
    `,
  styleUrls: ['app/app.component.css'],
  providers: [HeroService]
})
export class AppComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(private _heroService: HeroService) {}

  ngOnInit() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }
}
