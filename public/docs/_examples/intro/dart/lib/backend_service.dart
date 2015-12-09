// #docregion
library developer_guide_intro.backend_service;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/logger_service.dart';
import 'package:developer_guide_intro/hero.dart';

@Injectable()
class BackendService {
  Logger _logger;
  getAll(type) {
    // TODO get from the database and return as a promise
    if (type == Hero) {
      return [
        new Hero('Windstorm', power: 'Weather mastery'),
        new Hero('Mr. Nice', power: 'Killing them with kindness'),
        new Hero('Magneta', power: 'Manipulates metalic objects')
      ];
    }
    _logger.error('Cannot get object of this type');
    throw new Error();
  }

  BackendService(Logger this._logger);
}
