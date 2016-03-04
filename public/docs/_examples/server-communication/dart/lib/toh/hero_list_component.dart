// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'hero-list',
// #docregion template
    template: '''
      <h3>Heroes:</h3>
      <ul>
        <li *ngFor="#hero of heroes">
          {{hero.name}}
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
  final HeroService _heroService;
  String errorMessage;
  List<Hero> heroes = [];

  HeroListComponent(this._heroService);

  bool get hasErrorMessage => errorMessage != null;

  Future ngOnInit() => getHeroes();

  // #docregion methods
  Future getHeroes() async {
    try {
      heroes = await _heroService.getHeroes();
    } catch (e) {
      errorMessage = e.toString();
    }
  }

  Future addHero(String name) async {
    name = name.trim();
    if (name.isEmpty) return;
    try {
      heroes.add(await _heroService.addHero(name));
    } catch (e) {
      errorMessage = e.toString();
    }
  }
  // #enddocregion methods
}
// #enddocregion component
