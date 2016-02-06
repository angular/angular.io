// #docregion
import "package:angular2/core.dart";
import "hero-list.component.dart";
import "hero.service.provider.dart";

@Component(
    selector: "my-heroes",
    template: '''
  <h2>Heroes</h2>
  <hero-list></hero-list>
  ''',
    providers: const [heroServiceProvider],
    directives: const [HeroListComponent])
class HeroesComponent {}
