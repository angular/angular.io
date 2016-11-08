// #docplaster
// #docregion
// #docregion imports
import 'dart:async';

import 'package:angular2/core.dart';
// #docregion import-router
import 'package:angular2/router.dart';
// #enddocregion import-router

import 'hero.dart';
import 'hero_service.dart';
// #enddocregion imports

// #docregion metadata
@Component(
    selector: 'my-dashboard',
    // #docregion templateUrl
    templateUrl: 'dashboard_component.html',
    // #enddocregion templateUrl
    // #docregion css
    styleUrls: const ['dashboard_component.css'],
    // #enddocregion css
    directives: const [ROUTER_DIRECTIVES],
    )
// #enddocregion metadata
// #docregion class, component
class DashboardComponent implements OnInit {
  List<Hero> heroes;

  // #docregion ctor
  final HeroService _heroService;

  DashboardComponent(this._heroService);
  // #enddocregion ctor

  Future<Null> ngOnInit() async {
    heroes = (await _heroService.getHeroes()).skip(1).take(4).toList();
  }
}
