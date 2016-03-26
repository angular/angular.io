// #docregion
import 'package:angular2/core.dart';

import 'child_component.dart';
import 'logger_service.dart';

@Component(
    selector: 'after-content',
    template: '''
    <div class="after-content">
      <div>-- child content begins --</div>

      <ng-content></ng-content>

      <div>-- child content ends --</div>
    </div>
    ''',
    styles: const ['.after-content {background: LightCyan; padding: 8px;}'])
class AfterContentComponent
    implements AfterContentChecked, AfterContentInit, AfterViewInit {
  LoggerService _logger;

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent) ChildComponent contentChild;

  // Query for a VIEW child of type`ChildComponent`
  // No such VIEW child exists!
  // This component holds content but no view of that type.
  @ViewChild(ChildComponent) ChildComponent viewChild;

  String _prevHero;

  AfterContentComponent(this._logger) {
    _logger.log('AfterContent ctor: $message');
  }

  ///// Hooks
  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    _logger.log('AfterContentInit: $message');
  }

  get hasViewChild => viewChild != null;

  ngAfterViewInit() {
    _logger
        .log('AfterViewInit: There is ${hasViewChild ? 'a' : 'no'} view child');
  }

  ngAfterContentChecked() {
    // contentChild is updated after the content has been checked
    // Called frequently; only report when the hero changes
    if (!hasContentChild || _prevHero == contentChild.hero) return;
    _prevHero = contentChild.hero;
    _logger.log('AfterContentChecked: $message');
  }

  bool get hasContentChild => contentChild != null;

  String get message => hasContentChild
      ? '"${contentChild.hero}" child content'
      : 'no child content';
}

@Component(
    selector: 'after-content-parent',
    template: '''
    <div class="parent">
      <h2>AfterContent</h2>

      <after-content>
        <input [(ngModel)]="hero">
        <button (click)="showChild = !showChild">Toggle child view</button>

        <my-child *ngIf="showChild" [hero]="hero"></my-child>
      </after-content>

      <h4>-- Lifecycle Hook Log --</h4>
      <div *ngFor="#msg of hookLog">{{msg}}</div>
    </div>
    ''',
    styles: const [
      '.parent {background: powderblue; padding: 8px; margin:100px 8px;}'
    ],
    directives: const [AfterContentComponent, ChildComponent],
    providers: const [LoggerService])
class AfterContentParentComponent {
  List<String> hookLog;
  String hero = 'Magneta';
  bool showChild = true;

  AfterContentParentComponent(LoggerService logger) {
    hookLog = logger.logs;
  }
}
