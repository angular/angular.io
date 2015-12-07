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
  var _renderer;
  var _el;

  onMouseEnter() {
    _highlight("yellow");
  }

  onMouseLeave() {
    _highlight(null);
  }

  void _highlight(String color) {
    _renderer.setElementStyle(_el, 'background-color', color);
  }

  Highlight(ElementRef el, Renderer renderer) {
    _el = el;
    _renderer = renderer;
  }
}
