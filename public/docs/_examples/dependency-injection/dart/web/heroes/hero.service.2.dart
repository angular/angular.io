// #docregion
import "package:angular2/core.dart";
import "hero.dart";
import "mock-heroes.dart";
import "../logger.service.dart";

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
