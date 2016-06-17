// #docplaster
// #docregion final
// #docregion v1
import 'package:angular2/core.dart';
import 'package:angular2/platform/browser.dart';
import 'package:http/http.dart';
import 'package:angular2_tour_of_heroes/app_component.dart';
// #enddocregion v1
import 'package:angular2_tour_of_heroes/in_memory_data_service.dart';

void main() {
  bootstrap(AppComponent, const [
    const Provider(Client, useClass: InMemoryDataService)
  ]);
}
// #enddocregion final
/*
// #docregion v1

void main() {
  bootstrap(AppComponent, const [BrowserClient]);
}
// #enddocregion v1
*/
