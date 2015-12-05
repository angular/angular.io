// #docregion
// #docregion import
import {Component, Input} from 'angular2/core';
// #enddocregion import
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
// #docregion input-def
export class HeroPanel {
    @Input() hero: Hero;
}
// #enddocregion input-def
// #enddocregion