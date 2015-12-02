// #docregion
library user_input.click_me_component;

import 'package:angular2/angular2.dart';

// #docregion click-me-component
@Component(
    selector: 'click-me',
    template: '''<button (click)="onClickMe()">Click me!</button>
    {{clickMessage}}''')
class ClickMeComponent {
  String clickMessage = '';

  onClickMe() {
    clickMessage = 'You are my hero!';
  }
}
// #enddocregion click-me-component
