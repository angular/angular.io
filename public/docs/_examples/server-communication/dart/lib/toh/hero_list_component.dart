// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'hero-list',
// #docregion template
    templateUrl: 'hero_list_component.html',
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
  // #docregion getHeroes
  Future getHeroes() async {
    try {
      heroes = await _heroService.getHeroes();
    } catch (e) {
      errorMessage = e.toString();
    }
  }
  // #enddocregion getHeroes

  // #docregion addHero
  Future addHero(String name) async {
    name = name.trim();
    if (name.isEmpty) return;
    try {
      heroes.add(await _heroService.addHero(name));
    } catch (e) {
      errorMessage = e.toString();
    }
  }
  // #enddocregion addHero
  // #enddocregion methods
}
// #enddocregion component
