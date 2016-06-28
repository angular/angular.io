// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';

int _nextId = 1;

// #docregion spy-directive
// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive(selector: '[mySpy]')
class SpyDirective implements OnInit, OnDestroy {
  final LoggerService _logger;

  SpyDirective(this._logger);

  ngOnInit() => _logIt('onInit');

  ngOnDestroy() => _logIt('onDestroy');

  _logIt(String msg) => _logger.log('Spy #${_nextId++} $msg');
}
// #enddocregion spy-directive
