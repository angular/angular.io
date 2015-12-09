// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/angular2.dart';

@Directive(
    selector: '[my-highlight]',
    host: const {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    })
class Highlight {
  Renderer _renderer;
  ElementRef _element;

  onMouseEnter() {
    _highlight("yellow");
  }

  onMouseLeave() {
    _highlight(null);
  }

  void _highlight(String color) {
    _renderer.setElementStyle(_element, 'background-color', color);
  }

  Highlight(ElementRef this._element, Renderer this._renderer);
}
