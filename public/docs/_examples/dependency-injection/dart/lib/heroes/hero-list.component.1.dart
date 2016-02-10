// #docregion
import "package:angular2/core.dart";
import "hero.dart";
import "mock-heroes.dart";

@Component(
    selector: "hero-list",
    template: '''
  <div *ngFor="#hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  ''')
class HeroListComponent {
  var heroes = HEROES;
}
