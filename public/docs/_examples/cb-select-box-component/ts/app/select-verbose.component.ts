// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero, HeroStoreService } from './hero-store.service';

@Component({
  selector: 'my-select-verbose',
  templateUrl: 'app/select-verbose.component.html'
})
export class SelectVerboseComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private store: HeroStoreService) { }
  // #docregion buttons-methods
  clear(): void {
    this.heroes = undefined;
    this.selectedHero = undefined;
  }
  // #enddocregion buttons-methods
  // #docregion select-methods
  isSelected(hero: Hero): boolean {
    return this.selectedHero && hero.id === this.selectedHero.id;
  }
  // #enddocregion select-methods
  // #docregion buttons-methods
  ngOnInit(): void {
    this.reload();
    this.selectedHero = this.heroes[1];
  }
  // #enddocregion buttons-methods
  // #docregion select-methods
  onChange(index: string): void {
    this.selectedHero = this.heroes[+index];
  }
  // #enddocregion select-methods
  // #docregion buttons-methods
  reload(): void {
    this.heroes = this.store.heroes.slice();
    this.selectedHero = this.heroes[0];
  }
  removeSelected(): void {
    if (this.heroes && this.selectedHero) {
      const index = this.heroes.indexOf(this.selectedHero);
      this.heroes.splice(index, 1);
      this.selectedHero = this.heroes[1];
    }
  }
  // #enddocregion buttons-methods
}
// #enddocregion
