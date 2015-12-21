// #docregion
library user_input.app_component;

import 'package:angular2/angular2.dart';
import 'package:user_input/click_me_component.dart';
import 'package:user_input/click_me_component_2.dart';
import 'package:user_input/loop_back_component.dart';
import 'package:user_input/key_up_components.dart';
import 'package:user_input/little_tour_component.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app-component.html',
    directives: const [
      ClickMeComponent,
      ClickMeComponent2,
      KeyUpComponentV1,
      KeyUpComponentV2,
      KeyUpComponentV3,
      KeyUpComponentV4,
      LoopBackComponent,
      LittleTourComponent
    ])
class AppComponent {}
