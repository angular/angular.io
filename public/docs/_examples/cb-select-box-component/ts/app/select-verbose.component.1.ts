// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero, HeroStoreService } from './hero-store.service';

@Component({
  selector: 'my-select-verbose',
  templateUrl: 'app/select-verbose.component.html'
})
export class SelectVerboseComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero;

  constructor(private store: HeroStoreService) { }

  ngOnInit(): void {
    this.heroes = this.store.heroes.slice();
    this.selectedHero = this.heroes[1];
  }
}
// #enddocregion
