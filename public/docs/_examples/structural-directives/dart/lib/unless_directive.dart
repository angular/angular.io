// #docplaster
// #docregion
// #docregion unless-declaration
import 'package:angular2/core.dart';
// #enddocregion unless-declaration

// #docregion unless-declaration
@Directive(selector: '[myUnless]')
class UnlessDirective {
  // #enddocregion unless-declaration

  // #docregion unless-constructor
  TemplateRef _templateRef;
  ViewContainerRef _viewContainer;

  UnlessDirective(this._templateRef, this._viewContainer);
  // #enddocregion unless-constructor

  // #docregion unless-set
  @Input()
  set myUnless(bool condition) {
    if (!condition) {
      _viewContainer.createEmbeddedView(_templateRef);
    } else {
      _viewContainer.clear();
    }
  }
  // #enddocregion unless-set
  // #docregion unless-declaration
}
// #enddocregion unless-declaration
