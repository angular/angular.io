// Examples of provider arrays

//#docplaster
import 'package:angular2/core.dart';

import 'app_config.dart';
import 'heroes/hero_service_provider.dart';
import 'heroes/hero_service.dart';
import 'logger_service.dart';
import 'user_service.dart';

@Component(
    selector: 'provider-1',
    template: '{{log}}',
    providers:
//#docregion providers-1
        const [Logger]
//#enddocregion providers-1
)
class ProviderComponent1 {
  String log;

  ProviderComponent1(Logger logger) {
    logger.log('Hello from logger provided with Logger class');
    log = logger.logs.last;
  }
}

@Component(
    selector: 'provider-2',
    template: '{{log}}',
    providers:
//#docregion providers-2
        const [const Provider(Logger, useClass: Logger)]
//#enddocregion providers-2
)
class ProviderComponent2 {
  String log;

  ProviderComponent2(Logger logger) {
    logger.log('Hello from logger provided with Provider class and useClass');
    log = logger.logs.last;
  }
}

@Component(
    selector: 'provider-3',
    template: '{{log}}',
    providers: const [const Provider(Logger, useClass: Logger)])
class ProviderComponent3 {
  String log;

  ProviderComponent3(Logger logger) {
    logger.log('Hello from logger provided with useClass');
    log = logger.logs.last;
  }
}

@Injectable()
class BetterLogger extends Logger {}

@Component(
    selector: 'provider-4',
    template: '{{log}}',
    providers:
//#docregion providers-4
        const [const Provider(Logger, useClass: BetterLogger)]
//#enddocregion providers-4
)
class ProviderComponent4 {
  String log;

  ProviderComponent4(Logger logger) {
    logger.log('Hello from logger provided with useClass:BetterLogger');
    log = logger.logs.last;
  }
}

// #docregion EvenBetterLogger
@Injectable()
class EvenBetterLogger implements Logger {
  final UserService _userService;
  @override List<String> logs = [];

  EvenBetterLogger(this._userService);

  @override void log(String message) {
    var msg = 'Message to ${_userService.user.name}: $message.';
    print(msg);
    logs.add(msg);
  }
}

// #enddocregion EvenBetterLogger
@Component(
    selector: 'provider-5',
    template: '{{log}}',
    providers:
//#docregion providers-5
        const [UserService, const Provider(Logger, useClass: EvenBetterLogger)]
//#enddocregion providers-5
)
class ProviderComponent5 {
  String log;

  ProviderComponent5(Logger logger) {
    logger.log('Hello from EvenBetterlogger');
    log = logger.logs.last;
  }
}

@Injectable()
class NewLogger extends Logger implements OldLogger {}

class OldLogger {
  List<String> logs = [];

  void log(String message) {
    throw new Exception('Should not call the old logger!');
  }
}

@Component(
    selector: 'provider-6a',
    template: '{{log}}',
    providers:
        //#docregion providers-6a
        const [NewLogger,
            // Not aliased! Creates two instances of `NewLogger`
            const Provider(OldLogger, useClass: NewLogger)]
        //#enddocregion providers-6a
)
class ProviderComponent6a {
  String log;

  ProviderComponent6a(NewLogger newLogger, OldLogger oldLogger) {
    if (identical(newLogger, oldLogger)) {
      throw new Exception('expected the two loggers to be different instances');
    }
    oldLogger.log('Hello OldLogger (but we want NewLogger)');
    // The newLogger wasn't called so no logs[]

    // display the logs of the oldLogger.
    log = newLogger.logs == null || newLogger.logs.isEmpty
        ? oldLogger.logs[0]
        : newLogger.logs[0];
  }
}

@Component(
    selector: 'provider-6b',
    template: '{{log}}',
    providers:
        //#docregion providers-6b
        const [NewLogger,
            // Alias OldLogger with reference to NewLogger
            const Provider(OldLogger, useExisting: NewLogger)]
       //#enddocregion providers-6b
)
class ProviderComponent6b {
  String log;

  ProviderComponent6b(NewLogger newLogger, OldLogger oldLogger) {
    if (!identical(newLogger, oldLogger)) {
      throw new Exception('expected the two loggers to be the same instance');
    }
    oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
    log = newLogger.logs[0];
  }
}

// #docregion opaque-token
const loggerPrefix = const OpaqueToken('Logger prefix');
// #enddocregion opaque-token

// #docregion configurable-logger
@Injectable()
class ConfigurableLogger extends Logger {
  final String _prefix;

// #docregion use-opaque-token
  ConfigurableLogger(@Inject(loggerPrefix) this._prefix);
// #enddocregion use-opaque-token

  @override
  void log(String msg) {
    super.log('$_prefix: $msg');
  }
}
// #enddocregion configurable-logger

@Component(selector: 'provider-7', template: '{{message}}',
//#docregion providers-7
providers: const [
  const Provider(Logger, useClass: ConfigurableLogger),
//#docregion providers-usevalue
  const Provider(loggerPrefix, useValue: 'Testing')
//#enddocregion providers-usevalue
]
//#enddocregion providers-7
)
class ProviderComponent7 {
  String message;

  ProviderComponent7(Logger logger) {
    logger.log('Hello from configurable logger.');
    message = logger.logs.last;
  }
}

@Component(selector: 'provider-8', template: '{{log}}', providers: const [
  const Provider(HeroService, useFactory: heroServiceFactory),
  Logger,
  UserService
])
class ProviderComponent8 {
  // #docregion provider-8-ctor
  ProviderComponent8(HeroService heroService);

  // #enddocregion provider-8-ctor

  // must be true else this component would have blown up at runtime
  var log = 'Hero service injected successfully';
}

@Component(
    selector: 'provider-9',
    template: '{{log}}',
    providers:
// #docregion providers-9
const [const Provider(AppConfig, useValue: config1)]
// #enddocregion providers-9
)
class ProviderComponent9 implements OnInit {
  AppConfig _config;
  String log;

  ProviderComponent9(AppConfig this._config);

  @override
  void ngOnInit() {
    log = 'appConfigToken Application title is ${_config.title}';
  }
}

// Normal required logger
@Component(selector: 'provider-10a', template: '{{log}}',
//#docregion providers-logger
    providers: const [Logger]
//#enddocregion providers-logger
    )
class ProviderComponent10a {
  String log;

  ProviderComponent10a(Logger logger) {
    logger.log('Hello from the required logger.');
    log = logger.logs.last;
  }
}

// Optional logger, can be null
@Component(selector: 'provider-10b', template: '{{log}}')
class ProviderComponent10b {
  // #docregion provider-10-ctor
  final Logger _logger;
  String log;

  ProviderComponent10b(@Optional() Logger this._logger) {
    // . . .
  // #enddocregion provider-10-ctor
    _logger == null ? log = 'No logger exists' : log = _logger.logs.last;
  // #docregion provider-10-ctor
  }
  // #enddocregion provider-10-ctor
}

// Optional logger, non null
@Component(selector: 'provider-10c', template: '{{log}}')
class ProviderComponent10c {
  // #docregion provider-10-logger
  final Logger _logger;
  String log;

  ProviderComponent10c(@Optional() Logger logger) :
        _logger = logger ?? new DoNothingLogger() {
    // . . .
    // #enddocregion provider-10-logger
    logger == null
        ? _logger.log('Optional logger was not available.')
        : _logger.log('Hello from the injected logger.');
    log = _logger.logs.last;
    // #docregion provider-10-logger
  }
// #enddocregion provider-10-logger
}

// #docregion provider-10-logger
// . . .
@Injectable()
class DoNothingLogger extends Logger {
  @override List<String> logs = [];
  @override void log(String msg) => logs.add(msg);
}
// #enddocregion provider-10-logger

@Component(
    selector: 'my-providers',
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
      <div id="p8"><provider-9></provider-9></div>
      <div id="p10a"><provider-10a></provider-10a></div>
      <div id="p10b"><provider-10b></provider-10b></div>
      <div id="p10c"><provider-10c></provider-10c></div>''',
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
      ProviderComponent9,
      ProviderComponent10a,
      ProviderComponent10b,
      ProviderComponent10c
    ])
class ProvidersComponent {}
