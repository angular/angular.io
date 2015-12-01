// #docregion
import {Component, bootstrap, Observable} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Hero} from './hero'
import {HeroesService} from './heroes-service';

@Component({
  selector: 'app',
// #docregion template
  template: `
  <h1>{{title}}</h1>
  <p>Heroes:</p>
  <h2>My favorite hero is: {{myHero?.name}}</h2>
  <ul>
    <li *ng-for="#hero of heroes">
      {{ hero.name }}
      </li>
  </ul>
  <p *ng-if="heroes.length > 0">There are many heroes!</p>
`
// #enddocregion template
})
// #docregion component
export class AppComponent {
  heroes = [];
  myHero: Hero;
  title = 'Tour of Heroes';

  constructor (heroesService: HeroesService) {
    heroesService
      .getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.myHero = heroes[0]
      });
  }
}
// #enddocregion component
// #docregion bootstrap
bootstrap(AppComponent, [HeroesService, HTTP_PROVIDERS]);
// #enddocregion bootstrap
// #enddocregion
