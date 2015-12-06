library developer_guide_intro.hero_service;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/hero.dart';
import 'package:developer_guide_intro/backend_service.dart';
import 'package:developer_guide_intro/logger_service.dart';

@Injectable()
class HeroService {
  var _backendService;
  var _logger;
  HeroService(){
    _logger = new Logger();
    _backendService = new BackendService();
  }
  getHeroes(){
    List<Hero> heroes = _backendService.getAll(Hero);
    return heroes;
  }
}
