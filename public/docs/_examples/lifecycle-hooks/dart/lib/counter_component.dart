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
      <div *ngFor="#chg of changeLog" mySpy>{{chg}}</div>
    </div>
    ''',
    styles: const [
      '.counter {background: LightYellow; padding: 8px; margin-top: 8px}'
    ],
    directives: const [Spy])
class MyCounter implements OnChanges {
  @Input() num counter;
  List<String> changeLog = [];

  ngOnChanges(Map<String, SimpleChange> changes) {
    // Empty the changeLog whenever counter goes to zero
    // hint: this is a way to respond programmatically to external value changes.
    if (this.counter == 0) {
      changeLog.clear();
    }

    // A change to `counter` is the only change we care about
    SimpleChange prop = changes['counter'];
    var prev = prop.isFirstChange() ? "{}" : prop.previousValue;
    changeLog.add(
        'counter: currentValue = ${prop.currentValue}, previousValue = $prev');
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
      <div *ngFor="#msg of spyLog">{{msg}}</div>
    </div>
    ''',
    styles: const [
      '.parent {background: gold; padding: 10px; margin:100px 8px;}'
    ],
    directives: const [MyCounter],
    providers: const [LoggerService])
class CounterParentComponent {
  num value;
  List<String> spyLog = [];

  LoggerService _logger;

  CounterParentComponent(this._logger) {
    spyLog = _logger.logs;
    reset();
  }

  updateCounter() => value += 1;

  reset() {
    _logger.log('-- reset --');
    value = 0;
  }
}
