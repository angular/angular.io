// #docregion
import 'package:angular2/angular2.dart';

import 'flying_heroes_component.dart';
import 'hero_async_message_component.dart';
import 'hero_birthday1_component.dart';
import 'hero_birthday2_component.dart';
import 'hero_list_component.dart';
import 'power_boost_calculator_component.dart';
import 'power_booster_component.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [
      FlyingHeroesComponent,
      FlyingHeroesImpureComponent,
      HeroAsyncMessageComponent,
      HeroBirthdayComponent,
      HeroBirthday2Component,
      HeroListComponent,
      PowerBoostCalculatorComponent,
      PowerBoosterComponent,
    ])
class AppComponent {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988
}
