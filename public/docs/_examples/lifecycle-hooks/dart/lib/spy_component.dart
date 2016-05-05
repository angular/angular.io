// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';
import 'spy_directive.dart';

@Component(
    selector: 'spy-parent',
    templateUrl: 'spy_component.html',
    styles: const [
      '.parent {background: khaki}',
      '.heroes {background: LightYellow; padding: 0 8px}'
    ],
    directives: const [Spy],
    providers: const [LoggerService])
class SpyParentComponent {
  String newName = 'Herbie';
  List<String> heroes = ['Windstorm', 'Magneta'];
  List<String> spyLog;
  LoggerService _logger;

  SpyParentComponent(this._logger) {
    spyLog = _logger.logs;
  }

  addHero() {
    if (newName.trim().isNotEmpty) {
      heroes.add(newName.trim());
      newName = '';
      _logger.tick();
    }
  }

  // removeHero(String hero) { } is not used.
  
  reset() {
    _logger.log('-- reset --');
    heroes.clear();
    _logger.tick();
  }
}
