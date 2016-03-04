// #docplaster
// #docregion full
import 'package:angular2/core.dart';

@Directive(selector: '[my-highlight]', host: const {
  '(mouseenter)': 'onMouseEnter()',
  '(mouseleave)': 'onMouseLeave()'
})
// #docregion class-1
class Highlight {
  // #enddocregion class-1
// #enddocregion full
  /*
// #docregion highlight
  @Input() myHighlight: string;
// #enddocregion highlight
  */
// #docregion full
// #docregion class-1
// #docregion color
  @Input('my-highlight') String highlightColor;
// #enddocregion color

  String _defaultColor = 'red';
  // #enddocregion class-1
  // #docregion defaultColor
  @Input() set defaultColor(String colorName) {
    _defaultColor = (colorName ?? _defaultColor);
  }
  // #enddocregion defaultColor
// #docregion class-1

  final ElementRef _element;

// #docregion mouse-enter
  onMouseEnter() {
    _highlight(highlightColor ?? _defaultColor);
  }

// #enddocregion mouse-enter
  onMouseLeave() {
    _highlight(null);
  }

  void _highlight(String color) {
    _element.nativeElement.style.backgroundColor = color;
  }

  Highlight(this._element);
}
// #enddocregion class-1
// #enddocregion full
