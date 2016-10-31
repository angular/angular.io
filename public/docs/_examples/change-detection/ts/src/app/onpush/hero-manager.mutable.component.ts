import { Component } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  moduleId: module.id,
  selector: 'hero-manager-mutable',
  template: `
    <hero-list-onpush [heroes]="heroes">
    </hero-list-onpush>
    <button (click)="addHero()">Add one more</button>
  `
})
export class HeroManagerMutableComponent {
  heroes: Hero[] = [
    {name: 'Windstorm', onDuty: true},
    {name: 'Magneta', onDuty: false}
  ];

  // #docregion add-hero
  addHero() {
    // This will not be detected by the child component with OnPush!
    this.heroes.push({name: 'Bombasto', onDuty: true});
  }
  // #enddocregion add-hero

}
