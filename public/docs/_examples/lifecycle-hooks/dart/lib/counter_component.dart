// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';
import 'spy_directive.dart';

@Component(
    selector: 'my-counter',
    template: '''
    <div class="counter">
      Counter = {{counter}}

      <h5>-- Counter Change Log --</h5>
      <div *ngFor="let chg of changeLog" mySpy>{{chg}}</div>
    </div>
    ''',
    styles: const [
      '.counter {background: LightYellow; padding: 8px; margin-top: 8px}'
    ],
    directives: const [SpyDirective])
class MyCounterComponent implements OnChanges {
  @Input() num counter;
  List<String> changeLog = [];

  ngOnChanges(Map<String, SimpleChange> changes) {
    // Empty the changeLog whenever counter goes to zero
    // hint: this is a way to respond programmatically to external value changes.
    if (this.counter == 0) {
      changeLog.clear();
    }

    // A change to `counter` is the only change we care about
    SimpleChange chng = changes['counter'];
    var cur = chng.currentValue;
    var prev = chng.isFirstChange() ? "{}" : chng.previousValue;
    changeLog.add('counter: currentValue = $cur, previousValue = $prev');
  }
}

@Component(
    selector: 'counter-parent',
    template: '''
    <div class="parent">
      <h2>Counter Spy</h2>

      <button (click)="updateCounter()">Update counter</button>
      <button (click)="reset()">Reset Counter</button>

      <my-counter [counter]="value"></my-counter>

      <h4>-- Spy Lifecycle Hook Log --</h4>
      <div *ngFor="let msg of logs">{{msg}}</div>
    </div>
    ''',
    styles: const ['.parent {background: gold;}'],
    directives: const [MyCounterComponent],
    providers: const [LoggerService])
class CounterParentComponent {
  final LoggerService _logger;
  num value;

  CounterParentComponent(this._logger) {
    reset();
  }

  List<String> get logs => _logger.logs;

  void updateCounter() {
    value += 1;
    _logger.tick();
  }

  void reset() {
    _logger.log('-- reset --');
    value = 0;
    _logger.tick();
  }
}
