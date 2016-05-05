// #docregion
library attribute_directives.highlight_directive;

import 'package:angular2/core.dart';

@Directive(selector: '[myHighlight]')
class HighlightDirective {
  HighlightDirective(ElementRef element) {
    element.nativeElement.style.backgroundColor = 'yellow';
  }
}
