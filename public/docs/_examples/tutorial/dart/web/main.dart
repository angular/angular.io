import 'package:angular2/bootstrap.dart';
import 'package:angular2/router.dart';

import 'package:angular2_tour_of_heroes/hero_service.dart';
import 'package:angular2_tour_of_heroes/app_component.dart';

main() {
  bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HeroService
  ]);
}
