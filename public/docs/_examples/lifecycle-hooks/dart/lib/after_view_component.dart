// #docregion
import 'package:angular2/core.dart';

import 'child_component.dart';
import 'logger_service.dart';

@Component(
    selector: 'after-view-parent',
    template: '''
    <div class="parent">
      <h2>AfterView</h2>

      <div>
        <input [(ngModel)]="hero">
        <button (click)="showChild = !showChild">Toggle child view</button>

        <my-child *ngIf="showChild" [hero]="hero"></my-child>
      </div>

      <h4>-- Lifecycle Hook Log --</h4>
      <div *ngFor="#msg of hookLog">{{msg}}</div>
    </div>
    ''',
    styles: const [
      '.parent {background: burlywood; padding: 8px; margin:100px 8px;}'
    ],
    directives: const [ChildComponent],
    providers: const [LoggerService])
class AfterViewParentComponent
    implements AfterContentInit, AfterViewChecked, AfterViewInit {
  LoggerService _logger;
  List<String> hookLog;
  String hero = 'Magneta';
  bool showChild = true;

  // Query for a CONTENT child of type `ChildComponent`
  // No such CONTENT child exists!
  // This component holds a view but no content of that type.
  @ContentChild(ChildComponent)
  ChildComponent contentChild;

  // Query for a VIEW child of type `ChildComponent`
  @ViewChild(ChildComponent)
  ChildComponent viewChild;

  String _prevHero;

  AfterViewParentComponent(this._logger) {
    hookLog = _logger.logs;
    _logger.log('AfterView ctor: $message');
  }

  bool get _hasContentChild => contentChild != null;
  bool get _hasViewChild => viewChild != null;

  ///// Hooks
  ngAfterContentInit() {
    _logger.log(
        'AfterContentInit: There is ${ _hasContentChild ? 'a' : 'no'} content child');
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    _logger.log('AfterViewInit: $message');
  }

  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    // Called frequently; only report when the hero changes
    if (!_hasViewChild || _prevHero == viewChild.hero) return;
    _prevHero = viewChild.hero;
    _logger.log('AfterViewChecked: $message');
  }

  String get message =>
      _hasViewChild ? '"${viewChild.hero}" child view' : 'no child view';
}
