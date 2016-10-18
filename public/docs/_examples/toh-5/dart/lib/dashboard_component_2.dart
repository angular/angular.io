// #docplaster
// #docregion imports
import 'dart:async';

import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_service.dart';
// #enddocregion imports

// #docregion component
@Component(
  selector: 'my-dashboard',
  templateUrl: 'dashboard_component.html')
class DashboardComponent implements OnInit {
  List<Hero> heroes;
  final HeroService _heroService;

  DashboardComponent(this._heroService);

  Future<Null> ngOnInit() async {
    heroes = (await _heroService.getHeroes()).skip(1).take(4).toList();
  }

  gotoDetail() {/* not implemented yet */}
}
