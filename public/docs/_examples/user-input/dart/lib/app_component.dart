// #docregion
import 'package:angular2/angular2.dart';

import 'click_me_component.dart';
import 'click_me_component_2.dart';
import 'keyup_components.dart';
import 'little_tour_component.dart';
import 'loop_back_component.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
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
