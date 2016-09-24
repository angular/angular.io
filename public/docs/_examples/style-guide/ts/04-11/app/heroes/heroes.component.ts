// #docplaster
// #docregion
// #docregion example
import { Component } from '@angular/core';

import { LoggerService } from '../core/logger.service';
import { SpinnerService } from '../core/spinner/spinner.service';

@Component({
  // #enddocregion example
  moduleId: module.id,
  // #docregion example
  selector: 'toh-heroes',
  templateUrl: 'heroes.component.html'
})
export class HeroesComponent {
  // #enddocregion example
  // #docregion example
  heroes: any[];

  constructor(
    private loggerService: LoggerService,
    private spinnerService: SpinnerService
  ) { }

  getHeroes() {
    this.loggerService.log(`Getting heroes`);
    this.spinnerService.show();
    setTimeout(() => {
      this.heroes = [
        { id: 1, name: 'Windstorm' },
        { id: 2, name: 'Bombasto' },
        { id: 3, name: 'Magneta' },
        { id: 4, name: 'Tornado' }
      ];
      this.loggerService.log(`We have ${HeroesComponent.length} heroes`);
      this.spinnerService.hide();
    }, 2000);
  }
}
// #enddocregion example
