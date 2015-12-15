// #docregion
library developer_guide_intro.backend_service;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/logger_service.dart';
import 'package:developer_guide_intro/hero.dart';

@Injectable()
class BackendService {
  final Logger _logger;
  List getAll(type) {
    // TODO get from the database and return as a promise
    if (type == Hero) {
      return [
        new Hero('Windstorm', power: 'Weather mastery'),
        new Hero('Mr. Nice', power: 'Killing them with kindness'),
        new Hero('Magneta', power: 'Manipulates metalic objects')
      ];
    }
    _logger.error('Cannot get object of this type');
    throw new ArgumentError("TODO: put log content here");
  }

  BackendService(Logger this._logger);
}
