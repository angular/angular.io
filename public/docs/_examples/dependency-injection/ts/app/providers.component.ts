// Examples of provider arrays
//#docplaster
import { Component, Host, Inject, Injectable,
         provide, Provider}    from 'angular2/core';

import { APP_CONFIG,
         Config, CONFIG }      from './app.config';

import { HeroService}          from './heroes/hero.service';
import { heroServiceProvider } from './heroes/hero.service.provider';
import { Logger }              from './logger.service';
import { User, UserService }   from './user.service';

let template = '{{log}}';

//////////////////////////////////////////
@Component({
  selector: 'provider-1',
  template: template,
  providers:
    //#docregion providers-1
    [Logger]
    //#enddocregion providers-1
})
export class ProviderComponent1 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with Logger class');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
@Component({
  selector: 'provider-2',
  template: template,
  providers:
    //#docregion providers-2
    [new Provider(Logger, {useClass: Logger})]
    //#enddocregion providers-2
})
export class ProviderComponent2 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with Provider class and useClass');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
@Component({
  selector: 'provider-3',
  template: template,
  providers:
    //#docregion providers-3
    [provide(Logger, {useClass: Logger})]
    //#enddocregion providers-3
})
export class ProviderComponent3 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
class BetterLogger extends Logger {}

@Component({
  selector: 'provider-4',
  template: template,
  providers:
    //#docregion providers-4
    [provide(Logger, {useClass: BetterLogger})]
    //#enddocregion providers-4
})
export class ProviderComponent4 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:BetterLogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
// #docregion EvenBetterLogger
@Injectable()
class EvenBetterLogger {
  logs:string[] = [];

  constructor(private _userService: UserService) { }

  log(message:string){
    message = `Message to ${this._userService.user.name}: ${message}.`;
    console.log(message);
    this.logs.push(message);
  }
}
// #enddocregion EvenBetterLogger

@Component({
  selector: 'provider-5',
  template: template,
  providers:
    //#docregion providers-5
    [ UserService,
      provide(Logger, {useClass: EvenBetterLogger}) ]
    //#enddocregion providers-5
})
export class ProviderComponent5 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from EvenBetterlogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
class NewLogger extends Logger {}
class OldLogger {
  logs:string[] = [];
  log(message:string) {
    throw new Error('Should not call the old logger!')
  };
}

@Component({
  selector: 'provider-6a',
  template: template,
  providers:
    //#docregion providers-6a
    [ NewLogger,
      // Not aliased! Creates two instances of `NewLogger`
      provide(OldLogger, {useClass:NewLogger}) ]
    //#enddocregion providers-6a
})
export class ProviderComponent6a {
  log:string;
  constructor(newLogger:NewLogger, oldLogger: OldLogger) {
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
    //#docregion providers-6b
    [ NewLogger,
      // Alias OldLogger w/ reference to NewLogger
      provide(OldLogger, {useExisting: NewLogger}) ]
    //#enddocregion providers-6b
})
export class ProviderComponent6b {
  log:string;
  constructor(newLogger:NewLogger, oldLogger: OldLogger) {
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
}
// #enddocregion silent-logger

@Component({
  selector: 'provider-7',
  template: template,
  providers:
    //#docregion providers-7
    [provide(Logger, {useValue: silentLogger})]
    //#enddocregion providers-7
})
export class ProviderComponent7 {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useValue');
    this.log = logger.logs[0];
  }
}
/////////////////

@Component({
  selector: 'provider-8',
  template: template,
  providers:[heroServiceProvider, Logger, UserService]
})
export class ProviderComponent8{
  // #docregion provider-8-ctor
  constructor(heroService: HeroService){ }
  // #enddocregion provider-8-ctor

  // must be true else this component would have blown up at runtime
  log = 'Hero service injected successfully'
}

/////////////////
@Component({
  selector: 'provider-9a',
  template: template,
  providers:
    /*
    // #docregion providers-9a-interface
    // FAIL!  Can't use interface as provider token
    [provide(Config, {useValue: CONFIG})]
    // #enddocregion providers-9a-interface
    */
    // #docregion providers-9a
    // Use string as provider token
    [provide('app.config', {useValue: CONFIG})]
    // #enddocregion providers-9a
})
export class ProviderComponent9a {
  log: string;
  /*
  // #docregion provider-9a-ctor-interface
  // FAIL! Can't inject using the interface as the parameter type
  constructor(private _config: Config){ }
  // #enddocregion provider-9a-ctor-interface
  */

  // #docregion provider-9a-ctor
  // @Inject(token) to inject the dependency
  constructor(@Inject('app.config') private _config: Config){ }
  // #enddocregion provider-9a-ctor

  ngOnInit() {
     this.log = '"app.config" Application title is ' + this._config.title;
  }
}

@Component({
  selector: 'provider-9b',
  template: template,
  // #docregion providers-9b
  providers:[provide(APP_CONFIG, {useValue: CONFIG})]
  // #enddocregion providers-9b
})
export class ProviderComponent9b {
  log: string;
  // #docregion provider-9b-ctor
  constructor(@Inject(APP_CONFIG) private _config: Config){ }
  // #enddocregion provider-9b-ctor

  ngOnInit() {
     this.log = 'APP_CONFIG Application title is ' + this._config.title;
  }
}
//////////////////////////////////////////
// Normal required logger
@Component({
  selector: 'provider-10a',
  template: template,
  //#docregion providers-logger
  providers: [Logger]
  //#enddocregion providers-logger
})
export class ProviderComponent10a {
  log:string;
  constructor(logger: Logger) {
    logger.log('Hello from the required logger.');
    this.log = logger.logs[0];
  }
}

// Optional logger
// #docregion import-optional
import {Optional} from 'angular2/core';
// #enddocregion import-optional

@Component({
  selector: 'provider-10b',
  template: template
})
export class ProviderComponent10b {
  // #docregion provider-10-ctor
  log:string;
  constructor(@Optional() private _logger:Logger) {  }
  // #enddocregion provider-10-ctor

  ngOnInit() {
    // #docregion provider-10-logger
    // No logger? Make one!
    if (!this._logger) {
      this._logger = {
        log: (msg:string)=> this._logger.logs.push(msg),
        logs: []
      }
    // #enddocregion provider-10-logger      
      this._logger.log("Optional logger was not available.")
    // #docregion provider-10-logger      
    }
    // #enddocregion provider-10-logger
    else {
      this._logger.log('Hello from the injected logger.')
      this.log = this._logger.logs[0];
    }
    this.log = this._logger.logs[0];
  }
}

/////////////////
@Component({
  selector: 'my-providers',
  template: `
  <h2>Provider variations</h2>
  <div id="p1"><provider-1></provider-1></div>
  <div id="p2"><provider-2></provider-2></div>
  <div id="p3"><provider-3></provider-3></div>
  <div id="p4"><provider-4></provider-4></div>
  <div id="p5"><provider-5></provider-5></div>
  <div id="p6a"><provider-6a></provider-6a></div>
  <div id="p6b"><provider-6b></provider-6b></div>
  <div id="p7"><provider-7></provider-7></div>
  <div id="p8"><provider-8></provider-8></div>
  <div id="p9a"><provider-9a></provider-9a></div>
  <div id="p9b"><provider-9b></provider-9b></div>
  <div id="p10a"><provider-10a></provider-10a></div>
  <div id="p10b"><provider-10b></provider-10b></div>
  `,
  directives:[
    ProviderComponent1,
    ProviderComponent2,
    ProviderComponent3,
    ProviderComponent4,
    ProviderComponent5,
    ProviderComponent6a,
    ProviderComponent6b,
    ProviderComponent7,
    ProviderComponent8,
    ProviderComponent9a,
    ProviderComponent9b,
    ProviderComponent10a,
    ProviderComponent10b,
  ],
})
export class ProvidersComponent { }