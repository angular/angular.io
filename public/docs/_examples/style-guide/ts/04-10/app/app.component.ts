// #docregion
import { Component } from 'angular2/core';

// #docregion example
import { HeroesComponent } from './+heroes/index';
// #enddocregion example

@Component({
  selector: 'toh-app',
  template: '<div>app</div>',
  directives: [HeroesComponent]
})
export class AppComponent { }
