// #docregion pt1
import { Component } from '@angular/core';

// #docregion hero-class-1
export class Hero {
  id: number;
  name: string;
}
// #enddocregion hero-class-1

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <dl>
      <dt>id:</dt>
      <dd>{{hero.id}}</dd>
    </dl>
    <div>
      <label>name: 
        <input [(ngModel)]="hero.name" placeholder="name">
      </label>
    </div>
    `
})
export class AppComponent {
  title = 'Tour of Heroes';
  // #docregion hero-property-1
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  // #enddocregion hero-property-1
}
// #enddocregion pt1
