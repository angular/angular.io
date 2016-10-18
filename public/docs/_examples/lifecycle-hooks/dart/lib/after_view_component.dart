// #docplaster
// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';

//////////////////
// #docregion child-view
@Component(
  selector: 'my-child',
  template: '<input [(ngModel)]="hero">')
class ChildViewComponent {
  String hero = 'Magneta';
}
// #enddocregion child-view

//////////////////////
@Component(
  selector: 'after-view',
// #docregion template
  template: '''
    <div>-- child view begins --</div>
      <my-child></my-child>
    <div>-- child view ends --</div>
    <p *ngIf="comment.isNotEmpty" class="comment">{{comment}}</p>''',
// #enddocregion template
  directives: const [ChildViewComponent])
// #docregion hooks
class AfterViewComponent implements AfterViewChecked, AfterViewInit {
  var _prevHero = '';

  // Query for a VIEW child of type `ChildViewComponent`
  @ViewChild(ChildViewComponent) ChildViewComponent viewChild;

// #enddocregion hooks
  final LoggerService _logger;

  AfterViewComponent(this._logger) {
    _logIt('AfterView constructor');
  }

// #docregion hooks
  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    _logIt('AfterViewInit');
    _doSomething();
  }

  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    if (_prevHero == viewChild.hero) {
      _logIt('AfterViewChecked (no change)');
    } else {
      _prevHero = viewChild.hero;
      _logIt('AfterViewChecked');
      _doSomething();
    }
  }
// #enddocregion hooks

  String comment = '';

// #docregion do-something
  // This surrogate for real business logic sets the `comment`
  void _doSomething() {
    var c = viewChild.hero.length > 10 ? "That's a long name" : '';
    if (c != comment) {
      // Wait a tick because the component's view has already been checked
      _logger.tick().then((_) { comment = c; });
    }
  }
// #enddocregion do-something

  void _logIt(String method) {
    var child = viewChild;
    var message = "${method}: ${child != null ? child.hero:'no'} child view";
    _logger.log(message);
  }
// #docregion hooks
  // ...
}
// #enddocregion hooks

//////////////
@Component(
  selector: 'after-view-parent',
  template: '''
    <div class="parent">
      <h2>AfterView</h2>

      <after-view  *ngIf="show"></after-view>

      <h4>-- AfterView Logs --</h4>
      <p><button (click)="reset()">Reset</button></p>
      <div *ngFor="let msg of logs">{{msg}}</div>
    </div>
    ''',
  styles: const ['.parent {background: burlywood}'],
  providers: const [LoggerService],
  directives: const [AfterViewComponent])
class AfterViewParentComponent {
  final LoggerService _logger;
  bool show = true;

  AfterViewParentComponent(this._logger);

  List<String> get logs => _logger.logs;

  void reset() {
    logs.clear();
    // quickly remove and reload AfterViewComponent which recreates it
    show = false;
    _logger.tick().then((_) { show = true; });
  }

}
// #enddocregion
