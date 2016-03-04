import 'package:angular2/platform/browser.dart';
import 'package:dependency_injection/app_component.dart';
import 'package:dependency_injection/heroes/hero_service.dart';

main() {
  //#docregion bootstrap
  bootstrap(AppComponent,
           [HeroService]); // DISCOURAGED (but works)
  //#enddocregion bootstrap
}
