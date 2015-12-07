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
  @Input('my-highlight') String highlightColor;

  @Input() set defaultColor(String colorName){
    _defaultColor = (colorName ?? _defaultColor);
  }

  var _renderer;
  var _el;
  var _defaultColor = 'red';

  onMouseEnter() {
    _highlight(highlightColor ?? _defaultColor);
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
