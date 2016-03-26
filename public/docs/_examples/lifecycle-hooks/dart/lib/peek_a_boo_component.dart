// #docregion
// #docregion lc-imports
import 'package:angular2/core.dart';

import 'logger_service.dart';

int nextId = 1;

@Component(
    selector: 'peek-a-boo',
    template: '<p>Now you see my hero, {{name}}</p>',
    styles: const ['p {background: LightYellow; padding: 8px}'])
class PeekABooComponent
    implements
        OnChanges,
        OnInit,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy {
  @Input() String name;

  int _afterContentCheckedCounter = 1;
  int _afterViewCheckedCounter = 1;
  int _id = nextId++;
  LoggerService _logger;
  int _onChangesCounter = 1;
  String _verb = 'initialized';

  PeekABooComponent(this._logger);

  // Only called if there is an @input variable set by parent.
  ngOnChanges(Map<String, SimpleChange> changes) {
    List<String> messages = [];
    changes.forEach((String propName, SimpleChange change) {
      if (propName == 'name') {
        var name = changes['name'].currentValue;
        messages.add('name $_verb to "$name"');
      } else {
        messages.add('$propName  $_verb');
      }
    });
    _logIt('onChanges (${_onChangesCounter++}): ${messages.join('; ')}');
    _verb = 'changed'; // Next time it will be a change
  }

  ngOnInit() => _logIt('onInit');

  ngAfterContentInit() => _logIt('afterContentInit');

  // Called after every change detection check
  // of the component (directive) CONTENT
  // Beware! Called frequently!
  ngAfterContentChecked() {
    int counter = _afterContentCheckedCounter++;
    _logIt('afterContentChecked (${counter})');
  }

  ngAfterViewInit() => _logIt('afterViewInit');

  // Called after every change detection check
  // of the component (directive) VIEW
  // Beware! Called frequently!
  ngAfterViewChecked() {
    int counter = _afterViewCheckedCounter++;
    _logIt('afterViewChecked ($counter)');
  }

  ngOnDestroy() => _logIt('onDestroy');

  _logIt(String msg) {
    // Don't tick or else
    // the AfterContentChecked and AfterViewChecked recurse.
    // Let parent call tick()
    _logger.log("#$_id $msg", true);
  }
}
