// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
import 'logger_service.dart';

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
