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

  String _defaultColor = 'red';
  Renderer _renderer;
  ElementRef _element;


  onMouseEnter() {
    _highlight(highlightColor ?? _defaultColor);
  }

  onMouseLeave() {
    _highlight(null);
  }

  void _highlight(String color) {
    _renderer.setElementStyle(_element, 'background-color', color);
  }

  Highlight(ElementRef this._element, Renderer this._renderer);

}
