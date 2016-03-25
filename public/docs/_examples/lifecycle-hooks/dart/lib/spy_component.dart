// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';
import 'spy_directive.dart';

@Component(
    selector: 'spy-parent',
    template: '''
    <div class="parent">
      <h2>Spy Directive</h2>

      <input [(ngModel)]="newName" (keyup.enter)="addHero()">
      <button (click)="addHero()">Add Hero</button>
      <button (click)="reset()">Reset Heroes</button>

      <p></p>
      <div *ngFor="#hero of heroes" mySpy class="heroes">
      {{hero}}
      </div>

      <h4>-- Spy Lifecycle Hook Log --</h4>
      <div *ngFor="#msg of spyLog">{{msg}}</div>
    </div>
    ''',
    styles: const [
      '.parent {background: khaki; padding: 10px; margin:100px 8px}',
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
    }
  }

  reset() {
    _logger.log('-- reset --');
    heroes.clear();
  }
}
