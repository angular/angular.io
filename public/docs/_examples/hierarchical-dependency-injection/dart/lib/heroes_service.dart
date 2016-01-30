// #docregion
import 'package:angular2/angular2.dart';

import 'hero.dart';

@Injectable()
class HeroesService {
  List<Hero> _heroes = [
    new Hero()
      ..name = "RubberMan"
      ..power = 'Flexibility',
    new Hero()
      ..name = "Tornado"
      ..power = 'Weather changer'
  ];

  List<Hero> getHeroes() {
    return _heroes;
  }
}
