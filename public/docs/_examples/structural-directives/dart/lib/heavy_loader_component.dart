// #docregion
import 'package:angular2/angular2.dart';
import 'dart:async';

int nextId = 1;

@Component(
    selector: 'heavy-loader',
    template: '<span>heavy loader #{{id}} on duty!</span>')
class HeavyLoaderComponent implements OnInit, OnDestroy {
  int id = nextId++;
  @Input() List<String> logs;

  ngOnInit() {
    // Mock todo: get 10,000 rows of data from the server
    _log(
        "heavy-loader ${this.id} initialized, loading 10,000 rows of data from the server");
  }

  ngOnDestroy() {
    // Mock todo: clean-up
    _log("heavy-loader ${this.id} destroyed, cleaning up");
  }

  _log(String msg) {
    logs.add(msg);
    _tick();
  }

  /// Triggers the next round of Angular change detection
  /// after one turn of the JavaScript cycle
  /// ensuring display of msg added in onDestroy
  _tick() {
    new Timer(new Duration(milliseconds: 0), () {});
  }
}
// #enddocregion
