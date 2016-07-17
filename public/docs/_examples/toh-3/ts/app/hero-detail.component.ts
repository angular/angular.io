// #docplaster
// #docregion
// #docregion v1
import { Component, Input } from '@angular/core';

// #enddocregion v1
// #docregion hero-import
import { Hero } from './hero';
// #enddocregion hero-import

// #docregion v1
@Component({
  selector: 'my-hero-detail',
// #enddocregion v1
  // #docregion template
  template: `
    <div *ngIf="hero">
      <h3>{{hero.name}} details!</h3>
      <dl>
        <dt>id:</dt>
        <dd>{{hero.id}}</dd>
      </dl>
      <div>
        <label>name: 
          <input [(ngModel)]="hero.name" placeholder="name">
        </label>
      </div>
    </div>
  `
  // #enddocregion template
// #docregion v1
})
export class HeroDetailComponent {
// #enddocregion v1
// #docregion hero-input
  @Input()
// #docregion hero
  hero: Hero;
// #enddocregion hero
// #enddocregion hero-input
// #docregion v1
}
// #enddocregion v1
