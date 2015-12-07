// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/angular2.dart';

@Directive(selector: '[my-highlight]')
class Highlight {
  Highlight(ElementRef el, Renderer renderer) {
    //el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(el, 'background-color', 'yellow');
  }
}
