// **WARNING**
// To try out this version of the app, ensure that you update:
// - web/index.html
// - pubspec.yaml
// to refer to this file instead of main.dart

import 'package:angular2/platform/browser.dart';

import 'package:dependency_injection/app_component_1.dart';
import 'package:dependency_injection/heroes/hero_service_1.dart';

void main() {
  bootstrap(AppComponent);
}

void main_alt() {
  // #docregion bootstrap-discouraged
  bootstrap(AppComponent,
    [HeroService]); // DISCOURAGED (but works)
  // #enddocregion bootstrap-discouraged
}
