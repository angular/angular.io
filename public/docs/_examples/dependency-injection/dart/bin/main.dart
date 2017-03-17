//#docregion

import "package:angular2/platform/browser.dart";
import "app.component.dart";
import "providers.component.dart";

main() {
  //#docregion bootstrap
  bootstrap(AppComponent);
  //#enddocregion bootstrap
  bootstrap(ProvidersComponent);
}