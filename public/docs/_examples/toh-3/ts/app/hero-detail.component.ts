// #docplaster
// #docregion
// #docregion v1
import {Component} from 'angular2/core';
// #enddocregion v1
// #docregion hero-import
import {Hero} from './hero';
// #enddocregion hero-import

// #docregion v1
@Component({
  selector: 'my-hero-detail',
// #enddocregion v1
  // #docregion template
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `,
  // #enddocregion template
  // #docregion inputs
  inputs: ['hero']
  // #enddocregion inputs
// #docregion v1
})
export class HeroDetailComponent {
// #enddocregion v1
// #docregion hero
  public hero: Hero;
// #enddocregion hero
// #docregion v1
}
// #enddocregion v1
