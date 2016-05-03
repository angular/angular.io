// #docregion
import { Component } from '@angular/core';

// #docregion example
import { HeroesComponent } from './+heroes/index';
// #enddocregion example

@Component({
  selector: 'toh-app',
  template: '<div>app</div>',
  directives: [HeroesComponent]
})
export class AppComponent { }
