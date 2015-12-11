// #docregion import
import {Component} from 'angular2/core';
// #enddocregion import
import {HeroListComponent} from './hero-list.component';

@Component({
  selector: 'my-app',
  template: '<hero-list></hero-list>',
  directives: [HeroListComponent]
})
// #docregion export
export class AppComponent { }
// #enddocregion export