// #docregion
import {Component} from 'angular2/core';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    <p>Heroes:</p>
    <ul>
  // #docregion li-repeater
      <li *ngFor="#hero of heroes">
        {{ hero }}
      </li>
  // #enddocregion li-repeater
    </ul>
  `
  // #enddocregion template
})
// #docregion mock-heroes
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[0];
}
// #enddocregion mock-heroes
// #enddocregion
