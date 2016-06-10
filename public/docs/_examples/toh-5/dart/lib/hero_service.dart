// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Injectable()
class HeroService {
  Future<List<Hero>> getHeroes() async => mockHeroes;

  // See the "Take it slow" appendix
  Future<List<Hero>> getHeroesSlowly() {
    return new Future<List<Hero>>.delayed(
        const Duration(seconds: 2), () => mockHeroes);
  }

  // #docregion get-hero
  Future<Hero> getHero(int id) async =>
      (await getHeroes()).firstWhere((hero) => hero.id == id);
  // #enddocregion get-hero
}
