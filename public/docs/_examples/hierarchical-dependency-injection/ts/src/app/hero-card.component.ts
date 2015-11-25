// #docregion
import {Component, Input} from 'angular2/angular2';
import {Hero} from './hero';

@Component({
  selector: 'hero-card',
  template: `
    <div>
      <span>Name:</span>
      <span>{{hero.name}}</span>
    </div>`
})
export class HeroCardComponent {
  @Input() hero: Hero;
}
// #docregion
