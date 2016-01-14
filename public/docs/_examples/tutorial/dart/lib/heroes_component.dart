import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero_service.dart';
import 'hero_detail_component.dart';
import 'hero.dart';

@Component(
    selector: 'my-heroes',
    templateUrl: 'heroes_component.html',
    styleUrls: const ['heroes_component.css'],
    directives: const [HeroDetailComponent])
class HeroesComponent implements OnInit {
  List<Hero> heroes;
  Hero selectedHero;

  final HeroService _heroService;
  final Router _router;

  HeroesComponent(this._heroService, this._router);

  getHeroes() async {
    heroes = await _heroService.getHeroes();
  }

  gotoDetail() {
    _router.navigate([
      'HeroDetail',
      {'id': selectedHero.id}
    ]);
  }

  ngOnInit() {
    getHeroes();
  }

  onSelect(Hero hero) {
    selectedHero = hero;
  }
}
