// #docregion
import {Component, Inject} from 'angular2/core';
import {HeroesService} from './heroes.service';
import {Hero} from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.id}}: {{hero.name}}</h2>
  `
})
export class HeroDetailComponent {
  hero:Hero;
  constructor(@Inject('heroes') heroes:HeroesService) {
    this.hero = heroes.get()[0];
  }
}
