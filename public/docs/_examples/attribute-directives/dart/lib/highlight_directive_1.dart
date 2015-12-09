// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/angular2.dart';

@Directive(selector: '[my-highlight]')
class Highlight {
  Highlight(ElementRef element, Renderer renderer) {
    //el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(element, 'background-color', 'yellow');
  }
}
