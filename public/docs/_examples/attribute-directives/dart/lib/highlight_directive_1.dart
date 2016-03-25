// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/core.dart';

@Directive(selector: '[my-highlight]')
class Highlight {
  Highlight(ElementRef element) {
    element.nativeElement.style.backgroundColor = 'yellow';
  }
}
