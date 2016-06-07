/* tslint:disable:one-line:check-open-brace*/
// Examples of provider arrays
// #docplaster
import { Component, Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig,
         HERO_DI_CONFIG }       from './app.config';

import { HeroService }          from './heroes/hero.service';
import { heroServiceProvider }  from './heroes/hero.service.provider';
import { Logger }               from './logger.service';
import { UserService }    from './user.service';

let template = '{{log}}';

//////////////////////////////////////////
@Component({
  selector: 'provider-1',
  template: template,
  // #docregion providers-1, providers-logger
  providers: [Logger]
  // #enddocregion providers-1, providers-logger
})
export class ProviderComponent1 {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with Logger class');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
@Component({
  selector: 'provider-3a',
  template: template,
  providers:
    // #docregion providers-3a
    [{ provide: Logger, useClass: Logger }]
    // #enddocregion providers-3a
})
export class ProviderComponent3a {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with { provide: Logger, useClass: Logger }');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
class BetterLogger extends Logger {}

@Component({
  selector: 'provider-4',
  template: template,
  providers:
    // #docregion providers-4
    [{ provide: Logger, useClass: BetterLogger }]
    // #enddocregion providers-4
})
export class ProviderComponent4 {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:BetterLogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
// #docregion EvenBetterLogger
@Injectable()
class EvenBetterLogger extends Logger {
  constructor(private userService: UserService) { super(); }

  log(message: string) {
    let name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}
// #enddocregion EvenBetterLogger

@Component({
  selector: 'provider-5',
  template: template,
  providers:
    // #docregion providers-5
    [ UserService,
      { provide: Logger, useClass: EvenBetterLogger }]
    // #enddocregion providers-5
})
export class ProviderComponent5 {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from EvenBetterlogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
class NewLogger extends Logger {}
class OldLogger {
  logs: string[] = [];
  log(message: string) {
    throw new Error('Should not call the old logger!');
  };
}

@Component({
  selector: 'provider-6a',
  template: template,
  providers:
    // #docregion providers-6a
    [ NewLogger,
      // Not aliased! Creates two instances of `NewLogger`
      { provide: OldLogger, useClass: NewLogger}]
    // #enddocregion providers-6a
})
export class ProviderComponent6a {
  log: string;
  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger === oldLogger){
      throw new Error('expected the two loggers to be different instances');
    }
    oldLogger.log('Hello OldLogger (but we want NewLogger)');
    // The newLogger wasn't called so no logs[]
    // display the logs of the oldLogger.
    this.log = newLogger.logs[0] || oldLogger.logs[0];
  }
}

@Component({
  selector: 'provider-6b',
  template: template,
  providers:
    // #docregion providers-6b
    [ NewLogger,
      // Alias OldLogger w/ reference to NewLogger
      { provide: OldLogger, useExisting: NewLogger}]
    // #enddocregion providers-6b
})
export class ProviderComponent6b {
  log: string;
  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger !== oldLogger){
      throw new Error('expected the two loggers to be the same instance');
    }
    oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
    this.log = newLogger.logs[0];
  }
}

//////////////////////////////////////////
// #docregion silent-logger
// An object in the shape of the logger service
let silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: () => {}
};
// #enddocregion silent-logger

@Component({
  selector: 'provider-7',
  template: template,
  providers:
    // #docregion providers-7
    [{ provide: Logger, useValue: silentLogger }]
    // #enddocregion providers-7
})
export class ProviderComponent7 {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useValue');
    this.log = logger.logs[0];
  }
}
/////////////////

@Component({
  selector: 'provider-8',
  template: template,
  providers: [heroServiceProvider, Logger, UserService]
})
export class ProviderComponent8 {
  // #docregion provider-8-ctor
  constructor(heroService: HeroService) { }
  // #enddocregion provider-8-ctor

  // must be true else this component would have blown up at runtime
  log = 'Hero service injected successfully via heroServiceProvider';
}

/////////////////
@Component({
  selector: 'provider-9',
  template: template,
  /*
   // #docregion providers-9-interface
   // FAIL!  Can't use interface as provider token
   [{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
   // #enddocregion providers-9-interface
   */
  // #docregion providers-9
  providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]
  // #enddocregion providers-9
})
export class ProviderComponent9 {
  log: string;
  /*
   // #docregion provider-9-ctor-interface
   // FAIL! Can't inject using the interface as the parameter type
   constructor(private config: AppConfig){ }
   // #enddocregion provider-9-ctor-interface
   */
  // #docregion provider-9-ctor
  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }
  // #enddocregion provider-9-ctor

  ngOnInit() {
     this.log = 'APP_CONFIG Application title is ' + this.config.title;
  }
}
//////////////////////////////////////////
// Sample providers 1 to 7 illustrate a required logger dependency.
// Optional logger, can be null
// #docregion import-optional
import { Optional } from '@angular/core';
// #enddocregion import-optional

let some_message: string = 'Hello from the injected logger';

@Component({
  selector: 'provider-10',
  template: template
})
export class ProviderComponent10 {
  log: string;
  // #docregion provider-10-ctor
  constructor(@Optional() private logger: Logger) {
    if (this.logger) {
      this.logger.log(some_message);
    }
  }
  // #enddocregion provider-10-ctor

  ngOnInit() {
    this.log = this.logger ? this.logger.logs[0] : 'Optional logger was not available';
  }
}

/////////////////
@Component({
  selector: 'my-providers',
  template: `
  <h2>Provider variations</h2>
  <div id="p1"><provider-1></provider-1></div>
  <div id="p3a"><provider-3a></provider-3a></div>
  <div id="p4"><provider-4></provider-4></div>
  <div id="p5"><provider-5></provider-5></div>
  <div id="p6a"><provider-6a></provider-6a></div>
  <div id="p6b"><provider-6b></provider-6b></div>
  <div id="p7"><provider-7></provider-7></div>
  <div id="p8"><provider-8></provider-8></div>
  <div id="p9"><provider-9></provider-9></div>
  <div id="p10"><provider-10></provider-10></div>
  `,
  directives: [
    ProviderComponent1,
    ProviderComponent3a,
    ProviderComponent4,
    ProviderComponent5,
    ProviderComponent6a,
    ProviderComponent6b,
    ProviderComponent7,
    ProviderComponent8,
    ProviderComponent9,
    ProviderComponent10,
  ],
})
export class ProvidersComponent { }
