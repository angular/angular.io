// #docregion
import 'package:angular2/core.dart';

@Directive(selector: '[my-highlight]',
// #docregion host
    host: const {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
// #enddocregion host
    )
class Highlight {
  final ElementRef _element;
// #docregion mouse-methods
  onMouseEnter() {
    _highlight("yellow");
  }

  onMouseLeave() {
    _highlight(null);
  }
  // #enddocregion mouse-methods

  void _highlight(String color) {
    _element.nativeElement.style.backgroundColor = color;
  }

// #docregion ctor
  Highlight(this._element);
// #enddocregion ctor
}
// #enddocregion
