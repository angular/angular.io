// #docplaster

// #docregion

// #docregion v1
import "package:angular2/core.dart";
import "hero-list.component.dart";
// #enddocregion v1
import "hero.service.dart";

// #docregion v1
@Component(
    selector: "my-heroes",
    template: '''
  <h2>Heroes</h2>
  <hero-list></hero-list>
  ''',
    providers: const [HeroService],
    directives: const [HeroListComponent])
class HeroesComponent {}
// #enddocregion v1
