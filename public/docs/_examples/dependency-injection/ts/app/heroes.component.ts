// #docregion
import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HEROES} from './mock_heroes';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html'
})
export class HeroesComponent {
  heroes: Hero[] = HEROES;
}
// #enddocregion
