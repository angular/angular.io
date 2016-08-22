/* FOR DOCS ... MUST MATCH ClickMeComponent template
// #docregion click-me-button
  <button (click)="onClickMe()">Click me!</button>
// #enddocregion click-me-button
*/

// #docregion
import 'package:angular2/core.dart';

// #docregion click-me-component
@Component(
    selector: 'click-me',
    template: '''
      <button (click)="onClickMe()">Click me!</button>
      {{clickMessage}}''')
class ClickMeComponent {
  String clickMessage = '';

  void onClickMe() {
    clickMessage = 'You are my hero!';
  }
}
