//#docregion
import 'package:angular2/platform/browser.dart';

import 'package:dependency_injection/app_component.dart';
import 'package:dependency_injection/providers_component.dart';

main() {
  //#docregion bootstrap
  bootstrap(AppComponent);
  //#enddocregion bootstrap
  bootstrap(ProvidersComponent);
}
