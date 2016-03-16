// #docregion metadata
import {Component} from 'angular2/core';

@Component({
  selector: 'hero-view',
  template: `
    <h1>Hero: {{getName()}}</h1>
  `
})
// #docregion appexport
// #docregion class
export class HeroComponent {
  getName() {
    return 'Windstorm';
  }
}
// #enddocregion class
// #enddocregion appexport
// #enddocregion metadata
