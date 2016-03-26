// #docplaster
// #docregion imports
import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_service.dart';
// #enddocregion imports

// #docregion component
@Component(
  selector: 'my-dashboard',
  templateUrl: 'dashboard_component.html'
)
class DashboardComponent implements OnInit {
  List<Hero> heroes;
  final HeroService _heroService;

  DashboardComponent(this._heroService);

  ngOnInit() async =>
      heroes = (await _heroService.getHeroes()).getRange(1, 5).toList();

  gotoDetail(){ /* not implemented yet */}
}
// #enddocregion component
