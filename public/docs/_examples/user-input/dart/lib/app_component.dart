// #docregion
library user_input.app_component;

import 'dart:html';

import 'package:angular2/angular2.dart';
import 'package:user_input/click_me_component.dart';
import 'package:user_input/loop_back_component.dart';
import 'package:user_input/key_up_components.dart';


@Component(
    selector: 'my-app',
    templateUrl: 'my-app.html',
    directives: const [
      CORE_DIRECTIVES,
      ClickMeComponent,
      KeyUpComponent,
      KeyUpComponentV2,
      KeyUpComponentV3,
      KeyUpComponentV4,
      LoopBackComponent
    ])
class AppComponent {
  onClickMe(event){
    var evtMsg = event != null ? ' Event target class is '+ event.target.className  : '';
    window.alert('Click me.'+evtMsg);
  }
}
