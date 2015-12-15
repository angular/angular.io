// #docregion pt1
import {Component} from 'angular2/core';

// #docregion hero-interface-1
interface Hero {
  id: number;
  name: string;
}
// #enddocregion hero-interface-1

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <div><input [(ngModel)]="hero.name" placeholder="name"></div>
    </div>
    `
})
export class AppComponent {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}

// #enddocregion pt1
