// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Injectable()
class HeroService {
  List<Hero> getHeroes() => HEROES;
}
