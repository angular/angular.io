// #docplaster
// #docregion
import 'dart:async';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_service.dart';

// #docregion metadata, renaming
@Component(
    selector: 'my-heroes',
    // #enddocregion renaming
    templateUrl: 'heroes_component.html',
    styleUrls: const ['heroes_component.css']
// #docregion renaming
)
// #enddocregion metadata
// #docregion class
class HeroesComponent implements OnInit {
  // #enddocregion renaming
  final Router _router;
  final HeroService _heroService;
  List<Hero> heroes;
  Hero selectedHero;

  // #docregion renaming
  HeroesComponent(this._heroService, this._router);
  // #enddocregion renaming

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
  // #docregion renaming
}
