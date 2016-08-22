// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
import 'restore_service.dart';

@Component(
    selector: 'hero-editor',
    // #docregion providers
    providers: const [RestoreService],
    // #enddocregion providers
    template: '''
  <div>
    <span>Name:</span>
    <input [(ngModel)]="hero.name"/>
    <div>
      <button (click)="onSaved()">save</button>
      <button (click)="onCanceled()">cancel</button>
    </div>
  </div>
  ''')
class HeroEditorComponent {
  @Output() final EventEmitter canceled = new EventEmitter();
  @Output() final EventEmitter saved = new EventEmitter();

  RestoreService<Hero> _restoreService;

  HeroEditorComponent(this._restoreService);

  @Input()
  set hero(Hero hero) {
    _restoreService.setItem(hero);
  }

  Hero get hero {
    return _restoreService.getItem();
  }

  onSaved() {
    saved.add(_restoreService.getItem());
  }

  onCanceled() {
    hero = _restoreService.restoreItem();
    canceled.add(hero);
  }
}
// #enddocregion
