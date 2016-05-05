// #docplaster
// #docregion full
import 'package:angular2/core.dart';

@Directive(selector: '[myHighlight]', host: const {
  '(mouseenter)': 'onMouseEnter()',
  '(mouseleave)': 'onMouseLeave()'
})
// #docregion class-1
class HighlightDirective {
  String _defaultColor = 'red';
  final _el;

  HighlightDirective(ElementRef elRef) : _el = elRef.nativeElement;
  // #enddocregion class-1

  // #docregion defaultColor
  @Input() set defaultColor(String colorName) {
    _defaultColor = (colorName ?? _defaultColor);
  }
  // #enddocregion defaultColor
  // #docregion class-1

  // #docregion color
  @Input('myHighlight') String highlightColor;
  // #enddocregion color
  
  // #docregion mouse-enter
  onMouseEnter() { _highlight(highlightColor ?? _defaultColor); }
  // #enddocregion mouse-enter
  onMouseLeave() { _highlight(); }

  void _highlight([String color]) {
    _el?.style?.backgroundColor = color;
  }
}
// #enddocregion class-1
// #enddocregion full
/*
// #docregion highlight
@Input() String myHighlight;
// #enddocregion highlight
*/
