// #docplaster

// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Injectable()
class HeroService {
  Future<List<Hero>> getHeroes() async => HEROES;

  // See the "Take it slow" appendix
  Future<List<Hero>> getHeroesSlowly() {
    return new Future<List<Hero>>.delayed(
        const Duration(seconds: 2), () => HEROES // 2 seconds
        );
  }

//#docregion get-hero
  Future<Hero> getHero(int id) async =>
      HEROES.where((hero) => hero.id == id).first;
//#enddocregion get-hero
}
// #enddocregion
