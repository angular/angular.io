// #docregion
import "package:angular2/core.dart";
import "hero.dart";
import "mock-heroes.dart";
import "../logger.service.dart";

@Injectable()
class HeroService {
  String _user;
  // #docregion internals
  Logger _logger;
  bool _isAuthorized;

  HeroService(this._logger, this._isAuthorized);

  getHeroes() {
    var auth = _isAuthorized ? 'authorized' : 'unauthorized';
    _logger.log('Getting heroes for ${auth} user.');
    return HEROES.where((hero) => _isAuthorized || !hero.isSecret).toList();
  }
// #enddocregion internals
}
