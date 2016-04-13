// #docplaster
// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Injectable()
class HeroService {
  //#docregion get-heroes
  Future<List<Hero>> getHeroes() async => mockHeroes;
  //#enddocregion get-heroes

  // See the "Take it slow" appendix
  //#docregion get-heroes-slowly
  Future<List<Hero>> getHeroesSlowly() {
    return new Future.delayed(const Duration(seconds: 2), () => mockHeroes);
  }
  //#enddocregion get-heroes-slowly
}
// #enddocregion
