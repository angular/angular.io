// #docplaster
// #docregion full
library attribute_directives.highlight_directive;

import 'package:angular2/angular2.dart';

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

  final Renderer _renderer;
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
    _renderer.setElementStyle(_element, 'background-color', color);
  }

  Highlight(this._element, this._renderer);
}
// #enddocregion class-1
// #enddocregion full
