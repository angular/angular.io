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
  final dynamic _el;

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
  void onMouseEnter() { _highlight(highlightColor ?? _defaultColor); }
  // #enddocregion mouse-enter
  void onMouseLeave() { _highlight(); }

  void _highlight([String color]) {
    if(_el != null) _el.style.backgroundColor = color;
  }
}
// #enddocregion class-1
// #enddocregion full
/*
// #docregion highlight
@Input() String myHighlight;
// #enddocregion highlight
*/
