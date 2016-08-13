// #docplaster
// #docregion , v2
import 'dart:async';
import 'dart:html';

// #docregion import-oninit
import 'package:angular2/core.dart';
// #enddocregion import-oninit
// #docregion router
import 'package:angular2/router.dart';
// #enddocregion router

import 'hero.dart';
// #docregion import-hero-service
import 'hero_service.dart';
// #enddocregion import-hero-service

@Component(
    selector: 'my-hero-detail',
    // #docregion templateUrl
    templateUrl: 'hero_detail_component.html',
    // #enddocregion templateUrl, v2
    styleUrls: const ['hero_detail_component.css']
    // #docregion v2
    )
// #docregion implement
class HeroDetailComponent implements OnInit {
  // #enddocregion implement
  Hero hero;
  // #docregion ctor
  final HeroService _heroService;
  final RouteParams _routeParams;

  HeroDetailComponent(this._heroService, this._routeParams);
  // #enddocregion ctor

  // #docregion ngOnInit
  Future<Null> ngOnInit() async {
    // #docregion get-id
    var idString = _routeParams.get('id');
    var id = int.parse(idString, onError: (_) => null);
    // #enddocregion get-id
    if (id != null) hero = await (_heroService.getHero(id));
  }
  // #enddocregion ngOnInit

  // #docregion goBack
  void goBack() {
    window.history.back();
  }
  // #enddocregion goBack
}
