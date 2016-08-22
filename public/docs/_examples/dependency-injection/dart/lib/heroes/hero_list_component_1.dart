// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Component(
    selector: 'hero-list',
    template: '''
      <div *ngFor="let hero of heroes">
        {{hero.id}} - {{hero.name}}
      </div>''')
class HeroListComponent {
  final List<Hero> heroes = HEROES;
}
