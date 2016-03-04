// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'hero-list',
    template: '''
      <div *ngFor="#hero of heroes">
        {{hero.id}} - {{hero.name}}
      </div>''')
class HeroListComponent {
  final List<Hero> heroes;

//#docregion ctor
  HeroListComponent(HeroService heroService)
      : heroes = heroService.getHeroes();
//#enddocregion ctor
}
