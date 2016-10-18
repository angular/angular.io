// #docplaster
// #docregion
import 'dart:async';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_detail_component.dart';
import 'hero_service.dart';

// #docregion metadata, heroes-component-renaming
@Component(
    selector: 'my-heroes',
    // #enddocregion heroes-component-renaming
    templateUrl: 'heroes_component.html',
    styleUrls: const ['heroes_component.css'],
    directives: const [HeroDetailComponent])
// #docregion heroes-component-renaming
// #enddocregion heroes-component-renaming, metadata
// #docregion class, heroes-component-renaming
class HeroesComponent implements OnInit {
  // #enddocregion heroes-component-renaming
  final Router _router;
  final HeroService _heroService;
  List<Hero> heroes;
  Hero selectedHero;

  HeroesComponent(this._heroService, this._router);

  Future<Null> getHeroes() async {
    heroes = await _heroService.getHeroes();
  }

  void ngOnInit() {
    getHeroes();
  }

  void onSelect(Hero hero) {
    selectedHero = hero;
  }

  Future<Null> gotoDetail() => _router.navigate([
        'HeroDetail',
        {'id': selectedHero.id.toString()}
      ]);
  // #docregion heroes-component-renaming
}
