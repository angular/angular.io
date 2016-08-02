// #docregion , search
import 'dart:async';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_service.dart';
import 'hero_search_component.dart';

@Component(
    selector: 'my-dashboard',
    templateUrl: 'dashboard_component.html',
    styleUrls: const ['dashboard_component.css'],
    directives: const [HeroSearchComponent])
// #enddocregion search
class DashboardComponent implements OnInit {
  List<Hero> heroes;

  final Router _router;
  final HeroService _heroService;

  DashboardComponent(this._heroService, this._router);

  Future<Null> ngOnInit() async {
    heroes = (await _heroService.getHeroes()).skip(1).take(4).toList();
  }

  void gotoDetail(Hero hero) {
    var link = [
      'HeroDetail',
      {'id': hero.id.toString()}
    ];
    _router.navigate(link);
  }
}
