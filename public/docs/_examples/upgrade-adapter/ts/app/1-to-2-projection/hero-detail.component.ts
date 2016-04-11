// #docregion
import {Component, Input} from 'angular2/core';
import {Hero} from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.name}}</h2>
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
