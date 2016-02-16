// #docregion

import 'package:angular2/core.dart';
import 'hero.dart';
import 'mock_heroes.dart';
import '../logger_service.dart';

@Injectable()
class HeroService {
  // #docregion internals
  Logger _logger;
  bool _isAuthorized;

  HeroService(this._logger, this._isAuthorized);

  List<Hero> getHeroes() {
    var auth = _isAuthorized ? 'authorized' : 'unauthorized';
    _logger.log('Getting heroes for ${auth} user.');
    return HEROES.where((hero) => _isAuthorized || !hero.isSecret).toList();
  }
// #enddocregion internals
}
