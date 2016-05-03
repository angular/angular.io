// #docplaster
// #docregion
import {Component, ElementRef, Host, Inject,  Optional} from '@angular/core';
import {HeroCacheService} from './hero-cache.service';
import {LoggerService}    from './logger.service';

// #docregion component
@Component({
  selector:'hero-contact',
  template:`
  <div>Phone #: {{phoneNumber}}
  <span *ngIf="hasLogger">!!!</span></div>`
})
export class HeroContactComponent {

  hasLogger = false;

  constructor(
  // #docregion ctor-params
      @Host() // limit to the host component's instance of the HeroCacheService
      private _heroCache: HeroCacheService,

      @Host()     // limit search for logger; hides the application-wide logger
      @Optional() // ok if the logger doesn't exist
      private _loggerService: LoggerService
  // #enddocregion ctor-params
  ) {
    if (_loggerService) {
      this.hasLogger = true;
      _loggerService.logInfo('HeroContactComponent can log!');
    }
  // #docregion ctor
  }
  // #enddocregion ctor

  get phoneNumber() { return this._heroCache.hero.phone; }

}
// #enddocregion component
