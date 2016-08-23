// #docplaster
// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';

//////////////////
@Component(
    selector: 'my-child',
    template: '<input [(ngModel)]="hero">')
class ChildComponent {
  String hero = 'Magneta';
}

//////////////////////
@Component(
    selector: 'after-content',
// #docregion template
    template: '''
      <div>-- projected content begins --</div>
        <ng-content></ng-content>
      <div>-- projected content ends --</div>
      <p *ngIf="comment.isNotEmpty" class="comment">{{comment}}</p>
    '''
// #enddocregion template
    )
// #docregion hooks
class AfterContentComponent implements AfterContentChecked, AfterContentInit {
  String _prevHero = '';
  String comment = '';

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent) ChildComponent contentChild;

// #enddocregion hooks
  final LoggerService _logger;

  AfterContentComponent(this._logger) {
    _logIt('AfterContent constructor');
  }

// #docregion hooks
  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    _logIt('AfterContentInit');
    _doSomething();
  }

  ngAfterContentChecked() {
    // contentChild is updated after the content has been checked
    if (_prevHero == contentChild?.hero) {
      _logIt('AfterContentChecked (no change)');
    } else {
      _prevHero = contentChild?.hero;
      _logIt('AfterContentChecked');
      _doSomething();
    }
  }
// #enddocregion hooks
// #docregion do-something
  /// This surrogate for real business logic; sets the `comment`
  void _doSomething() {
    comment = contentChild.hero.length > 10 ? "That's a long name" : '';
  }
// #enddocregion do-something

  void _logIt(String method) {
    var child = contentChild;
    var message = "${method}: ${child?.hero ?? 'no'} child content";
    _logger.log(message);
  }
// #docregion hooks
  // ...
}
// #enddocregion hooks

//////////////
@Component(
    selector: 'after-content-parent',
// #docregion parent-template
    template: '''
      <div class="parent">
        <h2>AfterContent</h2>

        <div *ngIf="show">
          <after-content>
            <my-child></my-child>
          </after-content>
        </div>

        <h4>-- AfterContent Logs --</h4>
        <p><button (click)="reset()">Reset</button></p>
        <div *ngFor="let msg of logs">{{msg}}</div>
      </div>
    ''',
// #enddocregion parent-template
    styles: const ['.parent {background: burlywood}'],
    providers: const [LoggerService],
    directives: const [AfterContentComponent, ChildComponent])
class AfterContentParentComponent {
  final LoggerService _logger;
  bool show = true;

  AfterContentParentComponent(this._logger);

  List<String> get logs => _logger.logs;

  void reset() {
    logs.clear();
    // quickly remove and reload AfterViewComponent which recreates it
    show = false;
    _logger.tick().then((_) { show = true; });
  }

}
