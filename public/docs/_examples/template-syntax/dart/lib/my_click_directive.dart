// #docregion
library template_syntax.my_click_directive;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Directive(selector: '[myClick]')
class MyClickDirective {
  // #docregion my-click-output-1
  @Output()
  final EventEmitter clicks = new EventEmitter<String>();
  // #enddocregion my-click-output-1

  MyClickDirective(ElementRef el) {
    el.nativeElement.onClick.listen(this.clicks.add('Click!'));
  }
}

// #docregion my-click-output-2
@Directive(
// #enddocregion my-click-output-2
    selector: '[myClick2]',
// #docregion my-click-output-2
    outputs: const ['clicks:myClick'])
// #enddocregion my-click-output-2
class MyClickDirective2 {
  final EventEmitter clicks = new EventEmitter<String>();

  MyClickDirective(ElementRef el) {
    el.nativeElement.onClick.listen(this.clicks.add('Click!'));
  }
}
