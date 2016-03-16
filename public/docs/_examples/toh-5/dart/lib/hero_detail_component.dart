// #docplaster
// #docregion
// #docregion v2
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
import 'dart:html';

// #docregion extract-template
@Component(
  selector: 'my-hero-detail',
  // #docregion template-url
  templateUrl: 'hero_detail_component.html',
  // #enddocregion template-url
// #enddocregion v2
  styleUrls: const ['hero_detail_component.css']
// #docregion v2
)
// #enddocregion extract-template
// #docregion implement
class HeroDetailComponent implements OnInit {
// #enddocregion implement
// #docregion ctor
  HeroDetailComponent(this._heroService, this._routeParams);

  HeroService _heroService;

  RouteParams _routeParams;
// #enddocregion ctor
  Hero hero;

// #docregion ng-oninit
  ngOnInit() async {
    // #docregion get-id
    var id = int.parse(_routeParams.get('id'));
    // #enddocregion get-id
    hero = await (_heroService.getHero(id));
  }
// #enddocregion ng-oninit

// #docregion go-back
  goBack() {
    window.history.back();
  }
// #enddocregion go-back
}
// #enddocregion v2
// #enddocregion
