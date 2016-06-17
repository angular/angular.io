// #docplaster
// #docregion
import 'dart:async';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_detail_component.dart';
import 'hero_service.dart';

@Component(
    selector: 'my-heroes',
    templateUrl: 'heroes_component.html',
    styleUrls: const ['heroes_component.css'],
    directives: const [HeroDetailComponent])
class HeroesComponent implements OnInit {
  final Router _router;
  final HeroService _heroService;
  List<Hero> heroes;
  Hero selectedHero;
  // #docregion error
  String errorMessage;
  // #enddocregion error

  HeroesComponent(this._heroService, this._router);

  // #docregion addHero
  Future<Null> addHero(String name) async {
    name = name.trim();
    if (name.isEmpty) return;
    try {
      heroes.add(await _heroService.save(name));
    } catch (e) {
      errorMessage = e.toString();
    }
  }
  // #enddocregion addHero

  // #docregion deleteHero
  Future<Null> deleteHero(int id, event) async {
    try {
      event.stopPropagation();
      await _heroService.delete(id);
      heroes.removeWhere((hero) => hero.id == id);
      if (selectedHero?.id == id) selectedHero = null;
    } catch (e) {
      errorMessage = e.toString();
    }
  }
  // #enddocregion deleteHero

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
}
