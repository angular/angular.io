import 'package:angular2/core.dart';

import 'backend_service.dart';
import 'hero.dart';
import 'logger_service.dart';

// #docregion class
@Injectable()
class HeroService {
  final BackendService _backendService;
  final Logger _logger;
  HeroService(Logger this._logger, BackendService this._backendService);
  List<Hero> getHeroes() {
    List<Hero> heroes = _backendService.getAll(Hero);
    _logger.log('Got ${heroes.length} heroes from the server.');
    return heroes;
  }
}
// #enddocregion class
