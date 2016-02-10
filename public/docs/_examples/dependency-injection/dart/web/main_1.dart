import "package:angular2/platform/browser.dart";
import "package:dependency_injection/app_component.dart";
import "package:dependency_injection/heroes/hero_service.dart";
//#docregion bootstrap

main() {
// Injecting services in bootstrap works but is discouraged
  bootstrap(AppComponent, [HeroService]);
//#enddocregion bootstrap
}