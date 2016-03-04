// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

int nextId = 1;

@Component(
    selector: 'heavy-loader',
    template: '<span>heavy loader #{{id}} on duty!</span>')
class HeavyLoaderComponent implements OnInit, OnDestroy {
  int id = nextId++;
  @Input() List<String> logs;

  // Mock todo: get 10,000 rows of data from the server
  ngOnInit() => _log(
      "heavy-loader $id initialized, loading 10,000 rows of data from the server");

  // Mock todo: clean-up
  ngOnDestroy() => _log("heavy-loader $id destroyed, cleaning up");

  _log(String msg) {
    logs.add(msg);
    _tick();
  }

  /// Triggers the next round of Angular change detection
  /// after one turn of the browser event loop
  /// ensuring display of msg added in onDestroy
  _tick() => new Future(() {});
}
// #enddocregion
