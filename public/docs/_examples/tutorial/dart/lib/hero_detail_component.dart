import 'dart:html';

import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'hero.dart';
import 'hero_service.dart';

@Component(
    selector: 'my-hero-detail',
    templateUrl: 'hero_detail_component.html',
    styleUrls: const ['hero_detail_component.css'])
class HeroDetailComponent implements OnInit {
  @Input() Hero hero;

  final HeroService _heroService;
  final RouteParams _routeParams;

  HeroDetailComponent(this._heroService, this._routeParams);

  ngOnInit() async {
    int id = _routeParams.params['id'] as int;
    hero ??= await _heroService.getHero(id);
  }

  goBack() {
    window.history.back();
  }
}

