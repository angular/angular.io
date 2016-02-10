import "package:angular2/platform/browser.dart";
import "../lib/app.component.dart";
import "../lib/heroes/hero.service.dart";
//#docregion bootstrap

main() {
// Injecting services in bootstrap works but is discouraged
  bootstrap(AppComponent, [HeroService]);
//#enddocregion bootstrap
}