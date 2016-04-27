// #docplaster

// #docregion
import 'package:angular2/core.dart';
import 'logger_service.dart';
import 'dart:async';

//////////////////
@Component(selector: 'my-child', template: '<input type="text" [(ngModel)]="hero">')
class ChildComponent {
  var hero = "Magneta";
}

//////////////////////
@Component(
  selector: "after-content",
// #docregion template
  template: '''
    <div>-- projected content begins --</div>
      <ng-content></ng-content>
    <div>-- projected content ends --</div>'''
// #enddocregion template
    '''
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  ''')
class AfterContentComponent implements AfterContentChecked, AfterContentInit {
  LoggerService _logger;
  String _prevHero = "";
  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent)
  ChildComponent contentChild;
  // #enddocregion hooks
  AfterContentComponent(this._logger) {
    _logIt('AfterContent constructor');
  }
  // #docregion hooks
  ngAfterContentInit() {
    // viewChild is set after the view has been initialized
    _logIt('AfterContentInit');
    _doSomething();
  }

  ngAfterContentChecked() {
    // viewChild is updated after the view has been checked
    if (identical(_prevHero, contentChild.hero)) {
      _logIt('AfterContentChecked (no change)');
    } else {
      _prevHero = contentChild.hero;
      _logIt('AfterContentChecked');
      _doSomething();
    }
  }

  // #enddocregion hooks
  var comment = '';
  // #docregion do-something

  // This surrogate for real business logic sets the `comment`
  _doSomething() {
    comment =
    contentChild.hero.length > 10 ? "That's a long name" : '';
  }

  _logIt(String method) {
    var vc = contentChild;
    var message = '${method}: ${vc ? vc.hero : "no"} child view';
    _logger.log(message);
  }
}
// #enddocregion hooks

//////////////
@Component(
  selector: 'after-content-parent',
  template: '''
  <div class="parent">
    <h2>AfterContent</h2>

    <div   *ngIf="show">'''
    // #docregion parent-template
    '''<after-content>
        <my-child></my-child>
      </after-content>'''
    // #enddocregion parent-template
    '''</div>

    <h4>-- AfterContent Logs --</h4>
    <p><button (click)="reset()">Reset</button></p>
    <div *ngFor="#msg of logs">{{msg}}</div>
  </div>
  ''',
  styles: const ['.parent {background: burlywood}'],
  providers: const [LoggerService],
  directives: const [AfterContentComponent, ChildComponent])
class AfterContentParentComponent {
  List<String> logs;
  var show = true;
  AfterContentParentComponent(LoggerService logger) {
    logs = logger.logs;
  }
  reset() {
    logs.clear();
    // quickly remove and reload AfterContentComponent which recreates it
    show = false;
    new Future.delayed(const Duration(milliseconds: 0), () => show = true);
  }
}
