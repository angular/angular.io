// #docplaster
// #docregion
import 'package:angular2/core.dart';
// #enddocregion
import 'package:angular2/router.dart'; // for testing only
// #docregion

import 'hero_service.dart';
import 'heroes_component.dart';

@Component(
    selector: 'my-app',
    template: '''
      <h1>{{title}}</h1>
      <my-heroes></my-heroes>''',
    directives: const [HeroesComponent],
    providers: const [
      // #enddocregion
      ROUTER_PROVIDERS,
      // #docregion
      HeroService
    ])
class AppComponent {
  String title = 'Tour of Heroes';
}
