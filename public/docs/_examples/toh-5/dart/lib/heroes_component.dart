// #docplaster
// #docregion
import 'dart:async';
import 'package:angular2/core.dart';
import 'hero.dart';
import 'hero_detail_component.dart';
import 'package:angular2/router.dart';
import 'hero_service.dart';

// #docregion metadata
// #docregion heroes-component-renaming
@Component(
    selector: 'my-heroes',
// #enddocregion heroes-component-renaming
    templateUrl: 'heroes_component.html',
    styleUrls:  const ['heroes_component.css'],
    directives: const [HeroDetailComponent]
// #docregion heroes-component-renaming
)
// #enddocregion heroes-component-renaming
// #enddocregion metadata
// #docregion class
// #docregion heroes-component-renaming
class HeroesComponent implements OnInit {
// #enddocregion heroes-component-renaming
  HeroesComponent(this._heroService, this._router);

  List<Hero> heroes;
  Hero selectedHero;

  Router _router;

  final HeroService _heroService;

  getHeroes() async {
    heroes = await _heroService.getHeroes();
  }

  ngOnInit() {
    getHeroes();
  }

  onSelect(Hero hero) { selectedHero = hero; }

  gotoDetail() =>
      _router.navigate(['HeroDetail', {'id': selectedHero.id.toString()}]);
// #docregion heroes-component-renaming
}
// #enddocregion heroes-component-renaming
// #enddocregion class
// #enddocregion
