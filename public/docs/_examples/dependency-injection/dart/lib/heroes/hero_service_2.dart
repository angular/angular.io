// #docregion
import 'package:angular2/core.dart';

import '../logger_service.dart';
import 'hero.dart';
import 'mock_heroes.dart';

@Injectable()
class HeroService {
  final Logger _logger;

  //#docregion ctor
  HeroService(this._logger);
  //#enddocregion ctor
  List<Hero> getHeroes() {
    _logger.log('Getting heroes ...');
    return HEROES;
  }
}
