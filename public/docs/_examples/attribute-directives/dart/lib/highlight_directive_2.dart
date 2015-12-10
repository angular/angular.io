// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/angular2.dart';

@Directive(
    selector: '[my-highlight]',
// #docregion host
    host: const {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
// #enddocregion host
    )
class Highlight {
  Renderer _renderer;
  ElementRef _element;
// #docregion mouse-methods
  onMouseEnter() {
    _highlight("yellow");
  }

  onMouseLeave() {
    _highlight(null);
  }
  // #enddocregion mouse-methods

  void _highlight(String color) {
    _renderer.setElementStyle(_element, 'background-color', color);
  }

// #docregion ctor
  Highlight(ElementRef this._element, Renderer this._renderer);
// #enddocregion ctor
}
// #enddocregion
