// #docregion hero-detail-component-1
@Component({
  selector: 'my-hero-detail'
})
export class HeroDetailComponent { }
// #enddocregion hero-detail-component-1

// #docregion hero-detail-component-2
@Component({
  selector: 'my-hero-detail',
  template: ``
})
export class HeroDetailComponent { }
// #enddocregion hero-detail-component-2

// #docregion hero-detail-component-3
@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{selected.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class HeroDetailComponent { }
// #enddocregion hero-detail-component-3

// #docregion imports-1
import {Component} from 'angular2/core';
// #enddocregion imports-1

// #docregion hero-property
export class HeroDetailComponent {
  public hero: Hero;
}
// #enddocregion hero-property
