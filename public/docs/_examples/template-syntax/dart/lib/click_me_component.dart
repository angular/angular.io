library template_syntax.click_me_component;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Component(selector: 'click-me')
@View(template: '''<button (click)="onClickMe()">Click me</button>''')
class ClickMeComponent {
  onClickMe() {
    window.alert('You are my hero!');
  }
}
