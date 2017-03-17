// Examples of provider arrays

//#docplaster
import "package:angular2/core.dart"
   ;
import "app.config.dart";
import "heroes/hero.service.dart";
import "heroes/hero.service.provider.dart";
import "logger.service.dart";
import "user.service.dart";

// #docregion import-optional
import "package:angular2/core.dart";

const template = "{{log}}";
//////////////////////////////////////////
@Component (selector: "provider-1", template: template, providers:
//#docregion providers-1
const [ Logger])
class ProviderComponent1 {
  String log;

  ProviderComponent1(Logger logger) {
    logger.log("Hello from logger provided with Logger class");
    log = logger.logs [ 0 ];
  }
}
//////////////////////////////////////////
@Component (selector: "provider-2", template: template, providers:
//#docregion providers-2
const [ const Provider (Logger, useClass: Logger)])
class ProviderComponent2 {
  String log;

  ProviderComponent2(Logger logger) {
    logger.log("Hello from logger provided with Provider class and useClass");
    log = logger.logs [ 0 ];
  }
}

_provideLoggerUseClassLogger() => provide(Logger, useClass: Logger);
//////////////////////////////////////////
@Component (selector: "provider-3", template: template, providers:
//#docregion providers-3
const [ _provideLoggerUseClassLogger])
class ProviderComponent3 {
  String log;

  ProviderComponent3(Logger logger) {
    logger.log("Hello from logger provided with useClass");
    log = logger.logs [ 0 ];
  }
}
//////////////////////////////////////////
class BetterLogger extends Logger {}

_provideLoggerUseClassBetterLogger() => provide(Logger, useClass: BetterLogger);

@Component (selector: "provider-4", template: template, providers:
//#docregion providers-4
const [_provideLoggerUseClassBetterLogger])
class ProviderComponent4 {
  String log;

  ProviderComponent4(Logger logger) {
    logger.log("Hello from logger provided with useClass:BetterLogger");
    log = logger.logs [ 0 ];
  }
}
//////////////////////////////////////////

// #docregion EvenBetterLogger
@Injectable ()
class EvenBetterLogger {
  UserService _userService;

  List <String> logs = [];

  EvenBetterLogger(this._userService) {}

  log(String message) {
    message = '''Message to ${ _userService.user.name}: ${ message}.''';
    print(message);
    logs.add(message);
  }
}

_provideLoggerUseClassEvenBetterLogger() => provide(Logger, useClass: EvenBetterLogger);
// #enddocregion EvenBetterLogger
@Component (selector: "provider-5", template: template, providers:
//#docregion providers-5
const [ UserService, _provideLoggerUseClassEvenBetterLogger])
class ProviderComponent5 {
  String log;

  ProviderComponent5(Logger logger) {
    logger.log("Hello from EvenBetterlogger");
    log = logger.logs [ 0 ];
  }
}
//////////////////////////////////////////
class NewLogger extends Logger {}

class OldLogger {
  List <String> logs = [];

  log(String message) {
    throw new Exception("Should not call the old logger!");
  }
}

_provideOldLoggerUseClassNewLogger() => provide(OldLogger, useClass: NewLogger);

@Component (selector: "provider-6a", template: template, providers:
//#docregion providers-6a
const [ NewLogger,
// Not aliased! Creates two instances of `NewLogger`
_provideOldLoggerUseClassNewLogger
])
class ProviderComponent6a {
  String log;

  ProviderComponent6a(NewLogger newLogger, OldLogger oldLogger) {
    if (identical(newLogger, oldLogger)) {
      throw new Exception("expected the two loggers to be different instances");
    }
    oldLogger.log("Hello OldLogger (but we want NewLogger)");
    // The newLogger wasn't called so no logs[]

    // display the logs of the oldLogger.
    log = newLogger.logs[ 0 ] ?? oldLogger.logs[0];
  }
}

_provideOldLoggerUseExistingNewLogger() =>
    provide(OldLogger, useExisting: NewLogger);

@Component (selector: "provider-6b", template: template, providers:
//#docregion providers-6b
const [ NewLogger,
// Alias OldLogger w/ reference to NewLogger
_provideOldLoggerUseExistingNewLogger
])
class ProviderComponent6b {
  String log;

  ProviderComponent6b(NewLogger newLogger, OldLogger oldLogger) {
    if (!identical(newLogger, oldLogger)) {
      throw new Exception("expected the two loggers to be the same instance");
    }
    oldLogger.log("Hello from NewLogger (via aliased OldLogger)");
    log = newLogger.logs [ 0 ];
  }
}
//////////////////////////////////////////

// #docregion silent-logger

// An object in the shape of the logger service
var silentLogger = {
  "logs" : [ "Silent logger says \"Shhhhh!\". Provided via \"useValue\""],
  "log" : () {}
};

Provider provideLoggerUsValueSilentLogger() =>
    provide(Logger, useValue: silentLogger);
// #enddocregion silent-logger
@Component (selector: "provider-7", template: template, providers:
//#docregion providers-7
const [provideLoggerUsValueSilentLogger])
class ProviderComponent7 {
  String log;

  ProviderComponent7(Logger logger) {
    logger.log("Hello from logger provided with useValue");
    log = logger.logs [ 0 ];
  }
}
/////////////////
@Component (selector: "provider-8",
    template: template,
    providers: const [ heroServiceProvider, Logger, UserService])
class ProviderComponent8 {
  // #docregion provider-8-ctor
  ProviderComponent8(HeroService heroService) {}

  // #enddocregion provider-8-ctor

  // must be true else this component would have blown up at runtime
  var log = "Hero service injected successfully";
}

_provideAppConfigUseValueConfig() => provide("app.config", useValue: CONFIG);

/////////////////
@Component (selector: "provider-9a", template: template, providers:
/*
    // #docregion providers-9a-interface
    // FAIL!  Can't use interface as provider token
    [provide(Config, {useValue: CONFIG})]
    // #enddocregion providers-9a-interface
    */

// #docregion providers-9a

// Use string as provider token
const [ _provideAppConfigUseValueConfig])
class ProviderComponent9a {
  Config _config;

  String log;

  /*
  // #docregion provider-9a-ctor-interface
  // FAIL! Can't inject using the interface as the parameter type
  constructor(private _config: Config){ }
  // #enddocregion provider-9a-ctor-interface
  */

  // #docregion provider-9a-ctor

  // @Inject(token) to inject the dependency
  ProviderComponent9a(@Inject ("app.config") this._config) {}

  // #enddocregion provider-9a-ctor
  ngOnInit() {
    log = "\"app.config\" Application title is " + _config.title;
  }
}

Provider _provideAppConfigConstUseValueConfig() =>
    provide(APP_CONFIG, useValue: CONFIG);

@Component (selector: "provider-9b",
    template: template,
    providers: const [_provideAppConfigConstUseValueConfig])
class ProviderComponent9b {
  Config _config;

  String log;

  // #docregion provider-9b-ctor
  ProviderComponent9b(@Inject(APP_CONFIG) this._config) {}

  // #enddocregion provider-9b-ctor
  ngOnInit() {
    log = "APP_CONFIG Application title is " + _config.title;
  }
}
//////////////////////////////////////////

// Normal required logger
@Component (
    selector: "provider-10a", template: template, providers: const [ Logger])
class ProviderComponent10a {
  String log;

  ProviderComponent10a(Logger logger) {
    logger.log("Hello from the required logger.");
    log = logger.logs [ 0 ];
  }
}
// Optional logger

// #enddocregion import-optional
@Component (selector: "provider-10b", template: template)
class ProviderComponent10b {
  Logger _logger;

  // #docregion provider-10-ctor
  String log;

  ProviderComponent10b(@Optional () this._logger) {}

  // #enddocregion provider-10-ctor
  ngOnInit() {
    // #docregion provider-10-logger

    // No logger? Make one!
    if (_logger == null) {
      _logger =
      new Logger();
      // #enddocregion provider-10-logger
      _logger.log("Optional logger was not available.");
    } else {
      _logger.log("Hello from the injected logger.");
      log = _logger.logs [ 0 ];
    }
    log = _logger.logs [ 0 ];
  }
}
/////////////////
@Component (selector: "my-providers",
    template: '''
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
  ''',
    directives: const [
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
      ProviderComponent10b
    ])
class ProvidersComponent {}