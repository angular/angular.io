// #docplaster
// #docregion
// #docregion full, v1
import 'package:angular2/core.dart';

// #enddocregion full, v1
import 'hero_list_component_2.dart';
import 'hero_service_1.dart';
/*
// #docregion full, v1
import 'hero_list_component.dart';
// #enddocregion v1
import 'hero_service.dart';
// #enddocregion full
*/
// #docregion full, v1

@Component(
    selector: 'my-heroes',
    template: '''
      <h2>Heroes</h2>
      <hero-list></hero-list>''',
    // #enddocregion v1
    providers: const [HeroService],
    // #docregion v1
    directives: const [HeroListComponent])
class HeroesComponent {}
