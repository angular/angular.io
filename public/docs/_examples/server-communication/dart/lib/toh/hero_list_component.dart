// #docregion
import 'package:angular2/angular2.dart';
import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'hero-list',
// #docregion template
    template: '''
  <h3>Heroes:</h3>
  <ul>
    <li *ngFor="#hero of heroes">
      {{ hero.name }}
    </li>
  </ul>
  New Hero:
  <input #newHero />
  <button (click)="addHero(newHero.value); newHero.value=''">
    Add Hero
  </button>
  <div class="error" *ngIf="hasErrorMessage">{{errorMessage}}</div>
  ''',
// #enddocregion template
    styles: const ['.error {color:red;}'])
// #docregion component
class HeroListComponent implements OnInit {
  HeroService _heroService;
  String errorMessage;
  List<Hero> heroes;

  HeroListComponent(this._heroService);

  bool get hasErrorMessage => errorMessage != null;

  ngOnInit() => getHeroes();

  // #docregion methods
  getHeroes() async {
    // todo: handle error
    heroes = await _heroService.getHeroes();
  }

  addHero(String name) {
    name = name.trim();
    if (name.isEmpty) return;
    _heroService.addHero(name).then(heroes.add);
  }
  // #enddocregion methods
}
// #enddocregion component
