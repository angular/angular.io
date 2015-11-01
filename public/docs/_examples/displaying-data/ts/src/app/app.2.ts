// #docregion
// #docregion imports
import {Component, bootstrap, NgFor} from 'angular2/angular2';
// #enddocregion imports

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    <p>Heroes:</p>
    <ul>
  // #docregion li-repeater
      <li *ng-for="#hero of heroes">
        {{ hero }}
      </li>
  // #enddocregion li-repeater
    </ul>
  `,
  // #enddocregion template
  // #docregion directives
  directives: [NgFor]
  // #enddocregion directives
})
// #docregion mock-heroes
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[0];
}
// #enddocregion mock-heroes
// #enddocregion
