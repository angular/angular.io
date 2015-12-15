library developer_guide_intro.hero_service;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/hero.dart';
import 'package:developer_guide_intro/backend_service.dart';
import 'package:developer_guide_intro/logger_service.dart';

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
