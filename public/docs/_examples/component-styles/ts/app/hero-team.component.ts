import {Component, Input} from 'angular2/core';
import {Hero} from './hero';

// #docregion stylelink
@Component({
  selector: 'hero-team',
  template: `
    <link rel="stylesheet" href="app/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="#member of hero.team">
        {{member}}
      </li>
    </ul>
  `
})
export class HeroTeamComponent {
// #enddocregion stylelink

  @Input() hero:Hero;
}
