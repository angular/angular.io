// #docplaster
import 'dart:html';

import 'package:angular2/core.dart';

@Directive(selector: '[myClick]')
class MyClickDirective {
  // #docregion my-click-output-1
  // @Output(alias) [type info] propertyName = ...
  @Output('myClick') final EventEmitter clicks = new EventEmitter<String>();

  // #enddocregion my-click-output-1
  bool _toggle = false;

  MyClickDirective(ElementRef el) {
    Element nativeEl = el.nativeElement;
    nativeEl.onClick.listen((Event e) {
      _toggle = !_toggle;
      clicks.emit(_toggle ? 'Click!' : '');
    });
  }
}

// #docregion my-click-output-2
@Directive(
// #enddocregion my-click-output-2
    selector: '[myClick2]',
// #docregion my-click-output-2
    // ...
    outputs: const ['clicks:myClick']) // propertyName:alias
// #enddocregion my-click-output-2
class MyClickDirective2 {
  final EventEmitter clicks = new EventEmitter<String>();
  bool _toggle = false;

  MyClickDirective2(ElementRef el) {
    el.nativeElement.onClick.listen((Event e) {
      _toggle = !_toggle;
      clicks.emit(_toggle ? 'Click2!' : '');
    });
  }
}
