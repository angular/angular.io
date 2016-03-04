// #docregion
import 'package:angular2/core.dart';

import 'logger_service.dart';
import 'peek_a_boo_component.dart';

@Component(
    selector: 'peek-a-boo-parent',
    template: '''
    <div class="parent">
      <h2>Peek-A-Boo</h2>

      <button (click)="toggleChild()">
        {{hasChild ? 'Destroy' : 'Create'}} PeekABooComponent
      </button>
      <button (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>

      <peek-a-boo *ngIf="hasChild" [name]="heroName">
      </peek-a-boo>

      <h4>-- Lifecycle Hook Log --</h4>
      <div *ngFor="#msg of hookLog">{{msg}}</div>
    </div>
    ''',
    styles: const [
      '.parent {background: moccasin; padding: 10px; margin:100px 8px}'
    ],
    directives: const [PeekABooComponent],
    providers: const [LoggerService])
class PeekABooParentComponent {
  bool hasChild = false;
  List<String> hookLog;

  String heroName = 'Windstorm';
  LoggerService _logger;

  PeekABooParentComponent(this._logger) {
    hookLog = _logger.logs;
  }

  toggleChild() {
    hasChild = !hasChild;
    if (hasChild) {
      heroName = 'Windstorm';
      _logger.clear(); // clear log on create
    }
    _logger.tick();
  }

  updateHero() {
    heroName += '!';
    _logger.tick();
  }
}
