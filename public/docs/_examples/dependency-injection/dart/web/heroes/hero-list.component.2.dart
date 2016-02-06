// #docregion
import "package:angular2/core.dart";
import "hero.dart";
import "hero.service.dart";

@Component(
    selector: "hero-list",
    template: '''
  <div *ngFor="#hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  ''')
class HeroListComponent {
  List<Hero> heroes;
  //#docregion ctor
  HeroListComponent(HeroService heroService) {
    heroes = heroService.getHeroes();
  }
}
