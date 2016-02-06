// #docregion
import "package:angular2/core.dart";
import "hero.dart";
import "hero.service.dart";

@Component(
    selector: "hero-list",
    template: '''
  <div *ngFor="#hero of heroes">
    {{hero.id}} - {{hero.name}}
    ({{hero.isSecret ? \'secret\' : \'public\'}})
  </div>
  ''')
class HeroListComponent {
  List<Hero> heroes;
  //#docregion ctor-signature
  HeroListComponent(HeroService heroService) {
    //#enddocregion ctor-signature
    heroes = heroService.getHeroes();
  }
}
