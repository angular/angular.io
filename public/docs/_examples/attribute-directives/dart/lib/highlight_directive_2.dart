// #docregion
import 'package:angular2/core.dart';

@Directive(selector: '[myHighlight]',
    // #docregion host
    host: const {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
    // #enddocregion host
)
class HighlightDirective {
  // #docregion ctor
  final _el;
  HighlightDirective(ElementRef elRef) : _el = elRef.nativeElement;
  // #enddocregion ctor

  // #docregion mouse-methods
  onMouseEnter() { _highlight("yellow"); }
  onMouseLeave() { _highlight(); }

  void _highlight([String color]) {
    _el?.style?.backgroundColor = color;
  }
  // #enddocregion mouse-methods
}
// #enddocregion
