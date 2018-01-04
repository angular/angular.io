import { Component } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  moduleId: module.id,
  selector: 'hero-manager-immutable',
  template: `
    <hero-list-onpush [heroes]="heroes">
    </hero-list-onpush>
    <button (click)="addHero()">Add one more</button>
  `
})
export class HeroManagerImmutableComponent {
  heroes: Hero[] = [
    {name: 'Windstorm', onDuty: true},
    {name: 'Magneta', onDuty: false}
  ];

  // #docregion add-hero
  addHero() {
    this.heroes = [...this.heroes, {name: 'Bombasto', onDuty: true}];
  }
  // #enddocregion add-hero

}
