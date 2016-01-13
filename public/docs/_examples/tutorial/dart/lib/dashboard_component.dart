import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'my-dashboard',
    templateUrl: 'dashboard_component.html',
    styleUrls: const ['dashboard_component.css'])
class DashboardComponent implements OnInit {
  List<Hero> heroes = [];

  final HeroService _heroService;
  final Router _router;
  DashboardComponent(this._heroService, this._router);

  ngOnInit() async {
    _heroService
        .getHeroes()
        .then((heroes) => this.heroes = heroes.sublist(1, 5));
  }

  gotoDetail(Hero hero) {
    _router.navigate([
      'HeroDetail',
      {'id': hero.id}
    ]);
  }
}

