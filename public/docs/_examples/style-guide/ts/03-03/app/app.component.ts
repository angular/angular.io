import { Component, OnInit } from '@angular/core';

import { HeroCollectorService } from './shared/hero-collector.service';
import { Hero } from './shared/hero.model';

@Component({
  selector: 'sg-app',
  template: '<div>Our hero is {{hero.name}} and {{hero.power}}</div>',
  providers: [HeroCollectorService]
})
export class AppComponent implements OnInit {
  hero: Hero;

  constructor(private heroCollectorService: HeroCollectorService) { }

  ngOnInit() {
    this.hero = this.heroCollectorService.getHero();
  }
}
