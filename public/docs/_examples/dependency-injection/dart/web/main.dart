//#docregion

import "package:angular2/platform/browser.dart";
import "../lib/app_component.dart";
import "../lib/providers_component.dart";

main() {
  //#docregion bootstrap
  bootstrap(AppComponent);
  //#enddocregion bootstrap
  bootstrap(ProvidersComponent);
}