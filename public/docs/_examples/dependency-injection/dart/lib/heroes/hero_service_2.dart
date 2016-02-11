// #docregion

import "package:angular2/core.dart";
import "hero.dart";
import "mock_heroes.dart";
import "../logger_service.dart";

@Injectable()
class HeroService {
  Logger _logger;

  //#docregion ctor
  HeroService(this._logger);

  //#enddocregion ctor
  List<Hero> getHeroes() {
    _logger.log("Getting heroes ...");
    return HEROES;
  }
}
