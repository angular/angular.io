// #docregion
import {Component, Input} from 'angular2/angular2';
import {Hero} from '../hero';

@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'>
      <h3>{{hero.name}}</h3>
    </div>
  `,
  styleUrls: ['app/hero-panel.css']
})
export class HeroPanel {
    @Input() hero: Hero;
}
// #enddocregion