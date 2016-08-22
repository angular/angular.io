import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_detail_component.dart';
import 'hero_service.dart';

// #docregion metadata
@Component(
    selector: 'hero-list',
    templateUrl: 'hero_list_component.html',
    directives: const [HeroDetailComponent],
    // #docregion providers
    providers: const [HeroService]
    // #enddocregion providers
    )
// #docregion class
class HeroListComponent implements OnInit {
  // #enddocregion metadata
  List<Hero> heroes;
  Hero selectedHero;
  // #docregion ctor
  final HeroService _heroService;

  HeroListComponent(this._heroService);
  // #enddocregion ctor

  void ngOnInit() {
    heroes = _heroService.getHeroes();
  }

  void selectHero(Hero hero) {
    selectedHero = hero;
  }
  // #docregion metadata
}
