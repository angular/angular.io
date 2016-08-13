// #docplaster
// #docregion , v2
import 'package:angular2/core.dart';

import 'hero_service.dart';
import 'heroes_component.dart';

// #enddocregion v2
@Component(
  selector: 'my-app',
  template: '''
      <h1>{{title}}</h1>
      <my-heroes></my-heroes>''',
  directives: const [HeroesComponent],
  providers: const [HeroService])
// #enddocregion
// #docregion v2
@Component(
  selector: 'my-app',
  // #docregion template-v2
  template: '''
      <h1>{{title}}</h1>
      <a [routerLink]="['Heroes']">Heroes</a>
      <router-outlet></router-outlet>''',
  // #enddocregion template-v2
  directives: const [HeroesComponent],
  providers: const [HeroService])
// #docregion , v2
class AppComponent {
  String title = 'Tour of Heroes';
}
