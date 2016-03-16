// #docregion
import 'package:angular2/angular2.dart';

import 'hero.dart';
import 'mock_heroes.dart';

@Component(
    selector: 'hero-list',
    template: '''
      <div *ngFor="#hero of heroes">
        {{hero.id}} - {{hero.name}}
      </div>''')
class HeroListComponent {
  List<Hero> heroes = HEROES;
}
