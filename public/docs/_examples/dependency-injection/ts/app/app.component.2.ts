// #docregion
// #docregion imports
import { Component }         from '@angular/core';
import { CarComponent }      from './car/car.component';
import { HeroesComponent }   from './heroes/heroes.component.1';

import { Inject }   from '@angular/core';
import { APP_CONFIG, AppConfig,
         HERO_DI_CONFIG }    from './app.config';
import { Logger }            from './logger.service';
// #enddocregion imports

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-heroes></my-heroes>
  `,
  directives: [CarComponent, HeroesComponent],
  providers: [
    Logger,
   // #docregion providers
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
   // #enddocregion providers
  ]
})
export class AppComponent {
  title: string;

  // #docregion ctor
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.title = config.title;
  }
  // #enddocregion ctor
}
