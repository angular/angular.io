// #docplaster
// #docregion , v2
import 'dart:async';
import 'dart:html';

// #docregion import-oninit
import 'package:angular2/core.dart';
// #enddocregion import-oninit
// #docregion import-route-params
import 'package:angular2/router.dart';
// #enddocregion import-route-params

import 'hero.dart';
// #docregion import-hero-service
import 'hero_service.dart';
// #enddocregion import-hero-service

// #docregion extract-template
@Component(
    selector: 'my-hero-detail',
    // #docregion template-url
    templateUrl: 'hero_detail_component.html',
    // #enddocregion template-url, v2
    styleUrls: const ['hero_detail_component.css']
    // #docregion v2
    )
// #enddocregion extract-template
// #docregion implement
class HeroDetailComponent implements OnInit {
  // #enddocregion implement
  Hero hero;
  // #docregion ctor
  final HeroService _heroService;
  final RouteParams _routeParams;

  HeroDetailComponent(this._heroService, this._routeParams);
  // #enddocregion ctor

  // #docregion ng-oninit
  Future<Null> ngOnInit() async {
    // #docregion get-id
    var idString = _routeParams.get('id');
    var id = int.parse(idString, onError: (_) => null);
    // #enddocregion get-id
    if (id != null) hero = await (_heroService.getHero(id));
  }
  // #enddocregion ng-oninit

  // #docregion save
  Future<Null> save() async {
    await _heroService.save(hero);
    goBack();
  }
  // #enddocregion save

  // #docregion go-back
  void goBack() {
    window.history.back();
  }
  // #enddocregion go-back
}
