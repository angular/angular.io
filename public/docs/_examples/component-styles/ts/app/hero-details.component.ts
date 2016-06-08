import { Component, Input } from '@angular/core';
import { Hero } from './hero';
import { HeroTeamComponent } from './hero-team.component';

// #docregion styleurls
@Component({
  selector: 'hero-details',
  template: `
    <h2>{{hero.name}}</h2>
    <hero-team [hero]=hero></hero-team>
    <ng-content></ng-content>
  `,
  styleUrls: ['app/hero-details.component.css'],
  directives: [HeroTeamComponent]
})
export class HeroDetailsComponent {
  // #enddocregion styleurls
  @Input() hero: Hero;
  // #docregion styleurls
}
