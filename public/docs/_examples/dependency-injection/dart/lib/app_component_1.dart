// Early versions

// #docregion
import 'package:angular2/core.dart';

import 'car/car_component.dart';
import 'heroes/heroes_component_1.dart';

@Component(
    selector: 'my-app',
    template: '''
      <h1>{{title}}</h1>
      <my-car></my-car>
      <my-heroes></my-heroes>''',
    directives: const [CarComponent, HeroesComponent])
class AppComponent {
  final String title = 'Dependency Injection';
}
