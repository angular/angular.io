// #docregion
import 'package:angular2/core.dart';

// #docregion click-me-component
@Component(
    selector: 'click-me',
    template: '''
    // #docregion click-me-button
    <button (click)="onClickMe()">Click me!</button>
    // #enddocregion click-me-button
    {{clickMessage}}''')
class ClickMeComponent {
  String clickMessage = '';

  onClickMe() {
    clickMessage = 'You are my hero!';
  }
}
// #enddocregion click-me-component
