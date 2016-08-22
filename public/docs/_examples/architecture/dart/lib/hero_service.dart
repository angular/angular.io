import 'package:angular2/core.dart';

import 'backend_service.dart';
import 'hero.dart';
import 'logger_service.dart';

@Injectable()
// #docregion class
class HeroService {
  final BackendService _backendService;
  final Logger _logger;
  final List<Hero> heroes = [];

  HeroService(this._logger, this._backendService);

  List<Hero> getHeroes() {
    _backendService.getAll(Hero).then((heroes) {
      _logger.log('Fetched ${heroes.length} heroes.');
      this.heroes.addAll(heroes); // fill cache
    });
    return heroes;
  }
}
