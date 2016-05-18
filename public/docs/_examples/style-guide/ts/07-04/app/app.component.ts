// #docregion
import { Component } from '@angular/core';

import { HeroArena, HeroService, Hero } from './heroes/shared';

@Component({
  selector: 'toh-app',
  template: '<pre>{{heroes | json}}</pre>',
  providers: [HeroArena, HeroService]
})
export class AppComponent {
  heroes: Hero[] = [];

  constructor(private heroArena: HeroArena) { }

  ngOnInit() {
    this.heroArena.getParticipants().subscribe(heroes => this.heroes = heroes);
  }
}
