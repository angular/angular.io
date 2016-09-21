// #docplaster
// #docregion , v2
import 'dart:async';
import 'dart:html';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'my-hero-detail',
    templateUrl: 'hero_detail_component.html',
    styleUrls: const ['hero_detail_component.css']
    )
class HeroDetailComponent implements OnInit {
  Hero hero;
  final HeroService _heroService;
  final RouteParams _routeParams;

  HeroDetailComponent(this._heroService, this._routeParams);

  Future<Null> ngOnInit() async {
    var idString = _routeParams.get('id');
    var id = int.parse(idString, onError: (_) => null);
    if (id != null) hero = await (_heroService.getHero(id));
  }

  // #docregion save
  Future<Null> save() async {
    await _heroService.update(hero);
    goBack();
  }
  // #enddocregion save

  void goBack() {
    window.history.back();
  }
}
