// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';

int nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive(selector: '[mySpy]')
class Spy implements OnInit, OnDestroy {
  int _id = nextId++;
  LoggerService _logger;

  Spy(this._logger);

  ngOnInit() => _logIt('onInit');

  ngOnDestroy() => _logIt('onDestroy');

  _logIt(String msg) => _logger.log('Spy #$_id $msg');
}
