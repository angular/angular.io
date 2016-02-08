// #docregion
// #docregion imports
import {Component}         from 'angular2/core';
import {CarComponent}      from './car/car.component';
import {HeroesComponent}   from './heroes/heroes.component.1';

import {provide, Inject}   from 'angular2/core';
import {Config, CONFIG}    from './app.config';
import {Logger}            from './logger.service';
// #enddocregion imports

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-heroes></my-heroes>
  `,
  directives:[CarComponent, HeroesComponent],
// #docregion providers
  providers: [
    Logger,
   // #docregion provider-config
    provide('app.config', {useValue: CONFIG})
   // #enddocregion provider-config
  ]
// #docregion providers
})
export class AppComponent {
  title:string;

  // #docregion ctor
  constructor(@Inject('app.config') config:Config) {

    this.title = config.title;
  }
  // #docregion ctor
}
// #enddocregion
