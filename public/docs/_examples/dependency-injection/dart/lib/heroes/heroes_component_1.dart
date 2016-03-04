// #docplaster
// #docregion
// #docregion v1
import 'package:angular2/core.dart';

import 'hero_list_component.dart';
// #enddocregion v1
import 'hero_service.dart';
// #docregion v1

@Component(
    selector: 'my-heroes',
    template: '''
      <h2>Heroes</h2>
      <hero-list></hero-list>''',
// #enddocregion v1
// #docregion providers
    providers: const [HeroService],
// #enddocregion providers
// #docregion v1
    directives: const [HeroListComponent])
class HeroesComponent {}
// #enddocregion v1
