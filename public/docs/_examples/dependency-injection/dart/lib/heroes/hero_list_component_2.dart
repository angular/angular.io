// #docplaster
// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';
// #enddocregion
import 'hero_service_1.dart';
/*
// #docregion
import 'hero_service.dart';
// #enddocregion
*/
// #docregion

@Component(
    selector: 'hero-list',
    template: '''
      <div *ngFor="let hero of heroes">
        {{hero.id}} - {{hero.name}}
      </div>''')
class HeroListComponent {
  final List<Hero> heroes;

  // #docregion ctor
  HeroListComponent(HeroService heroService)
      : heroes = heroService.getHeroes();
  // #enddocregion ctor
}
