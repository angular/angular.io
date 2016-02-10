//#docregion

import "package:angular2/platform/browser.dart";
import "../lib/app.component.dart";
import "../lib/providers.component.dart";

main() {
  //#docregion bootstrap
  bootstrap(AppComponent);
  //#enddocregion bootstrap
  bootstrap(ProvidersComponent);
}