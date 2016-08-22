// #docregion
import 'package:angular2/core.dart';

import 'click_me_component.dart';
import 'click_me2_component.dart';
import 'keyup_components.dart';
import 'little_tour_component.dart';
import 'loop_back_component.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [
      ClickMeComponent,
      ClickMe2Component,
      KeyUpComponentV1,
      KeyUpComponentV2,
      KeyUpComponentV3,
      KeyUpComponentV4,
      LoopBackComponent,
      LittleTourComponent
    ])
class AppComponent {}
