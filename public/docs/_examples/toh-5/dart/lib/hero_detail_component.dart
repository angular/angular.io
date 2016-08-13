// #docplaster
// #docregion , v2
import 'dart:async';
// #docregion goBack
import 'dart:html';

// #enddocregion goBack
import 'package:angular2/core.dart';
// #docregion added-imports
import 'package:angular2/router.dart';

// #enddocregion added-imports
import 'hero.dart';
// #docregion added-imports
import 'hero_service.dart';
// #enddocregion added-imports

@Component(
    selector: 'my-hero-detail',
    // #docregion templateUrl
    templateUrl: 'hero_detail_component.html',
    // #enddocregion templateUrl, v2
    styleUrls: const ['hero_detail_component.css']
    // #docregion v2
    )
// #docregion goBack, implement
class HeroDetailComponent implements OnInit {
  // #enddocregion goBack, implement
  Hero hero;
  // #docregion ctor
  final HeroService _heroService;
  final RouteParams _routeParams;

  HeroDetailComponent(this._heroService, this._routeParams);
  // #enddocregion ctor

  // #docregion ngOnInit
  Future<Null> ngOnInit() async {
    var idString = _routeParams.get('id');
    var id = int.parse(idString ?? '', onError: (_) => null);
    if (id != null) hero = await (_heroService.getHero(id));
  }
  // #enddocregion ngOnInit
  // #docregion goBack

  void goBack() {
    window.history.back();
  }
}
