import {Component} from 'angular2/core';

@Component({
  selector: 'my-app-ctor',
  template: `
    <h1>{{title}} [Ctor version]</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    `
})
// #docregion app-ctor
export class AppCtorComponent {
  title: string;
  myHero: string;

  constructor() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
// #enddocregion app-ctor