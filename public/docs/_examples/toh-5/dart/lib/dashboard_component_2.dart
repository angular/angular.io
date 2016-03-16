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

  DashboardComponent(this._heroService);

  List<Hero> heroes;

  HeroService _heroService;

  ngOnInit() async =>
      heroes = (await this._heroService.getHeroes()).getRange(1, 5);

  gotoDetail(){ /* not implemented yet */}
}
// #enddocregion component
