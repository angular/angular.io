// #docplaster
// #docregion , v1, v2
import 'package:angular2/core.dart';
import 'package:angular2/platform/browser.dart';
import 'package:angular2_tour_of_heroes/app_component.dart';
// #enddocregion v1
import 'package:angular2_tour_of_heroes/in_memory_data_service.dart';
import 'package:http/http.dart';

void main() {
  bootstrap(AppComponent,
    [provide(Client, useClass: InMemoryDataService)]
    // Using a real back end? Import browser_client.dart and change the above to
    // [provide(Client, useFactory: () => new BrowserClient(), deps: [])]
  );
}
// #enddocregion v2,
/*
// #docregion v1
import 'package:http/browser_client.dart';

void main() {
  bootstrap(AppComponent, [
    provide(BrowserClient, useFactory: () => new BrowserClient(), deps: [])
  ]);
  // Simplify bootstrap provider list to [BrowserClient]
  // once there is a fix for:
  // https://github.com/dart-lang/angular2/issues/37
}
// #enddocregion v1
*/
