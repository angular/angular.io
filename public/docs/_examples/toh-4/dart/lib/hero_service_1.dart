// #docplaster
// #docregion final
// #docregion empty-class
import 'package:angular2/core.dart';

// #enddocregion empty-class
import 'hero.dart';
import 'mock_heroes.dart';

// #docregion getHeroes-stub
@Injectable()
class HeroService {
  // #enddocregion getHeroes-stub, empty-class, final
  /*
  // #docregion getHeroes-stub
  List<Hero> getHeroes() {}
  // #enddocregion getHeroes-stub
  */
  // #docregion final
  List<Hero> getHeroes() => mockHeroes;
  // #docregion empty-class, getHeroes-stub
}
