// #docregion hero-detail-component
import {Component} from 'angular2/core';

// #docregion inputs
@Component({
  selector: 'my-hero-detail',
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
  inputs: ['hero']
})
// #enddocregion inputs
export class HeroDetailComponent {
  public hero: Hero;
}
// #enddocregion hero-detail-component
