import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'logger_service.dart';

@Injectable()
class BackendService {
  static final _mockHeroes = [
    new Hero('Windstorm', 'Weather mastery'),
    new Hero('Mr. Nice', 'Killing them with kindness'),
    new Hero('Magneta', 'Manipulates metalic objects')
  ];

  final Logger _logger;

  BackendService(Logger this._logger);

  Future<List> getAll(type) {
    // TODO get from the database
    if (type == Hero) return new Future.value(_mockHeroes);

    var msg = 'Cannot get object of this type';
    _logger.error(msg);
    throw new Exception(msg);
  }
}
