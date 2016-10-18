// #docplaster
// #docregion
import 'package:angular2/core.dart';
// #docregion import-router
import 'package:angular2/router.dart';
// #enddocregion import-router

import 'hero_service.dart';
import 'heroes_component.dart';

@Component(
    selector: 'my-app',
    // #docregion template
    template: '''
      <h1>{{title}}</h1>
      <a [routerLink]="['Heroes']">Heroes</a>
      <router-outlet></router-outlet>''',
    // #enddocregion template
    // #docregion directives-and-providers
    directives: const [ROUTER_DIRECTIVES],
    providers: const [ROUTER_PROVIDERS, HeroService]
    // #enddocregion directives-and-providers
)
// #docregion route-config
@RouteConfig(const [
  const Route(path: '/heroes', name: 'Heroes', component: HeroesComponent)
])
// #enddocregion route-config
class AppComponent {
  String title = 'Tour of Heroes';
}
