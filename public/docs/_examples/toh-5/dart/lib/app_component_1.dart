// #docplaster
// #docregion
import 'package:angular2/angular2.dart';
import 'hero_service.dart';
import 'heroes_component.dart';
// #enddocregion

// For testing only
import 'package:angular2/router.dart';

// #docregion

@Component(
  selector: 'my-app',
  template: '''
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  ''',
  directives: const [HeroesComponent],
  providers: const [
// #enddocregion
   ROUTER_PROVIDERS,
// #docregion
    HeroService
  ]
)
class AppComponent {
  String title = 'Tour of Heroes';
}
// #enddocregion
