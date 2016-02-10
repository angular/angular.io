import "package:angular2/platform/browser.dart";
import "../lib/app_component.dart";
import "../lib/heroes/hero_service.dart";
//#docregion bootstrap

main() {
// Injecting services in bootstrap works but is discouraged
  bootstrap(AppComponent, [HeroService]);
//#enddocregion bootstrap
}