// #docplaster
// #docregion full
import 'package:angular2/core.dart';

@Directive(selector: '[myHighlight]')
// #docregion class
class HighlightDirective {
  String _defaultColor = 'red';
  final dynamic _el;

  HighlightDirective(ElementRef elRef) : _el = elRef.nativeElement;
  // #enddocregion class

  // #docregion defaultColor
  @Input()
  set defaultColor(String colorName) {
    _defaultColor = (colorName ?? _defaultColor);
  }
  // #enddocregion defaultColor
  // #docregion class

  // #docregion color
  @Input('myHighlight')
  String highlightColor;
  // #enddocregion color

  // #docregion mouse-enter
  @HostListener('mouseenter')
  void onMouseEnter() => _highlight(highlightColor ?? _defaultColor);

  // #enddocregion mouse-enter
  @HostListener('mouseleave')
  void onMouseLeave() => _highlight();

  void _highlight([String color]) {
    if (_el != null) _el.style.backgroundColor = color;
  }
}
// #enddocregion class
// #enddocregion full
/*
// #docregion highlight
@Input() String myHighlight;
// #enddocregion highlight
*/
