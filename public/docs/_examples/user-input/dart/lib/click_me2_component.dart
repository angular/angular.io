// #docregion
import 'package:angular2/core.dart';

@Component(
    selector: 'click-me2',
    template: '''
      <button (click)="onClickMe2(\$event)">No! .. Click me!</button>
      {{clickMessage}}''')
class ClickMe2Component {
  String clickMessage = '';
  int _clicks = 1;

  void onClickMe2(dynamic event) {
    var evtMsg =
        event != null ? ' Event target is ' + event.target.tagName : '';
    clickMessage = ('Click #${_clicks++}. ${evtMsg}');
  }
}
