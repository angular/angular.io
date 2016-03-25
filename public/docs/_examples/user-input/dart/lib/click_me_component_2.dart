// #docregion
import 'package:angular2/core.dart';

@Component(
    selector: 'click-me2',
    template: '''<button (click)="onClickMe2(\$event)">No! .. Click me!</button>
    {{clickMessage}}''')
class ClickMeComponent2 {
  String clickMessage = '';
  int clicks = 1;

  onClickMe2(dynamic event) {
    var evtMsg =
        event != null ? ' Event target is ' + event.target.tagName : '';
    clickMessage = ('Click #${clicks++}. ${evtMsg}');
  }
}
