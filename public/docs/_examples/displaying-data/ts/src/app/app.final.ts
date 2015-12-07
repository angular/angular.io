// #docplaster
// #docregion final
// #docregion imports
import {Component, CORE_DIRECTIVES} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
// #enddocregion imports
import {Hero} from './hero'

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero.name}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ng-for="#hero of heroes">
      {{ hero.name }}
      </li>
  </ul>
  // #docregion message
  <p *ng-if="heroes.length > 3">There are many heroes!</p>
  // #enddocregion message
`,
  // #docregion directives
  directives: [CORE_DIRECTIVES]
  // #enddocregion directives
})

export class AppComponent {
  title = 'Tour of Heroes';
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  myHero = this.heroes[0];
}
//#enddocregion final
/*
// #docregion final

bootstrap(AppComponent);
//#enddocregion final
*/