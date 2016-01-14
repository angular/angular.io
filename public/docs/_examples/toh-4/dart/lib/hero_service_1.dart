// #docplaster
// #docregion
import 'mock_heroes.dart';
import 'hero.dart';
// #docregion empty-class
import 'package:angular2/core.dart';

// #docregion getHeroes-stub
@Injectable()
class HeroService {
// #enddocregion empty-class
  List<Hero> getHeroes() {
// #enddocregion getHeroes-stub
    return mockHeroes;
// #docregion getHeroes-stub
  }
// #docregion empty-class
}
// #enddocregion getHeroes-stub
// #enddocregion empty-class
// #enddocregion