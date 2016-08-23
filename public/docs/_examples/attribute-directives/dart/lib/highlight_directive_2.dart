// #docregion
import 'package:angular2/core.dart';

@Directive(selector: '[myHighlight]')
class HighlightDirective {
  // #docregion ctor
  final dynamic _el;

  HighlightDirective(ElementRef elRef) : _el = elRef.nativeElement;
  // #enddocregion ctor

  // #docregion mouse-methods, host
  @HostListener('mouseenter')
  void onMouseEnter() {
    // #enddocregion host
    _highlight('yellow');
    // #docregion host
  }

  @HostListener('mouseleave')
  void onMouseLeave() {
    // #enddocregion host
    _highlight();
    // #docregion host
  }
  // #enddocregion host

  void _highlight([String color]) {
    if (_el != null) _el.style.backgroundColor = color;
  }
  // #enddocregion mouse-methods
}
// #enddocregion
