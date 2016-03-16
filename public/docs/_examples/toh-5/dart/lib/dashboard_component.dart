// #docplaster
// #docregion
import 'package:angular2/core.dart';
// #docregion import-router
import 'package:angular2/router.dart';
// #enddocregion import-router

import 'hero.dart';
import 'hero_service.dart';

@Component(
  selector: 'my-dashboard',
  // #docregion template-url
  templateUrl: 'dashboard_component.html',
  // #enddocregion template-url
  // #docregion css
  styleUrls: const ['dashboard_component.css']
  // #enddocregion css
)
// #docregion component
class DashboardComponent implements OnInit {
// #docregion ctor
  DashboardComponent(this._heroService, this._router);

  Router _router;

  HeroService _heroService;
// #enddocregion ctor

  List<Hero> heroes = [];

  ngOnInit() async =>
      heroes = (await _heroService.getHeroes()).getRange(1, 5);

  // #docregion goto-detail
  gotoDetail(Hero hero) {
    var link = ['HeroDetail', { 'id': hero.id.toString() }];
    _router.navigate(link);
  }
// #enddocregion goto-detail
}
// #enddocregion