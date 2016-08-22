// #docregion
// #docregion lc-imports
import 'package:angular2/core.dart';

import 'logger_service.dart';

int _nextId = 1;

// #docregion ngOnInit
class PeekABoo implements OnInit {
  final LoggerService _logger;

  PeekABoo(this._logger);

  // implement OnInit's `ngOnInit` method
  void ngOnInit() { _logIt('OnInit'); }

  void _logIt(String msg) {
    // Don't tick or else
    // the AfterContentChecked and AfterViewChecked recurse.
    // Let parent call tick()
    _logger.log("#${_nextId++} $msg");
  }
}
// #enddocregion ngOnInit

@Component(
    selector: 'peek-a-boo',
    template: '<p>Now you see my hero, {{name}}</p>',
    styles: const ['p {background: LightYellow; padding: 8px}'])
// Don't HAVE to mention the Lifecycle Hook interfaces
// unless we want typing and tool support.
class PeekABooComponent extends PeekABoo
    implements
        OnChanges,
        OnInit,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy {
  @Input() String name;

  int _afterContentCheckedCounter = 1;
  int _afterViewCheckedCounter = 1;
  int _onChangesCounter = 1;
  String _verb = 'initialized';

  PeekABooComponent(LoggerService logger) : super(logger) {
    var _is = name != null ? 'is' : 'is not';
    _logIt('name $_is known at construction');
  }

  // Only called if there is an @input variable set by parent.
  ngOnChanges(Map<String, SimpleChange> changes) {
    List<String> messages = [];
    changes.forEach((String propName, SimpleChange change) {
      if (propName == 'name') {
        var name = changes['name'].currentValue;
        messages.add('name $_verb to "$name"');
      } else {
        messages.add('$propName $_verb');
      }
    });
    _logIt('OnChanges (${_onChangesCounter++}): ${messages.join('; ')}');
    _verb = 'changed'; // Next time it will be a change
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck() => _logIt('DoCheck');

  ngAfterContentInit() => _logIt('AfterContentInit');

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() { _logIt('AfterContentChecked (${_afterContentCheckedCounter++})'); }

  ngAfterViewInit() => _logIt('AfterViewInit');

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() { _logIt('AfterViewChecked (${_afterViewCheckedCounter++})'); }

  ngOnDestroy() => _logIt('OnDestroy');
}
