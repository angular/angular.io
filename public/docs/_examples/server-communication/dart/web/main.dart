// #docplaster
// #docregion final
import 'package:angular2/core.dart';
// #docregion v1
import 'package:angular2/platform/browser.dart';
// #docregion http-providers
import 'package:http/browser_client.dart';
// #enddocregion http-providers

import 'package:server_communication/app_component.dart';
// #enddocregion v1
// #docregion in-mem-web-api-imports
import "package:server_communication/hero_data.dart";

// #enddocregion in-mem-web-api-imports
// #docregion in-mem-web-api-providers
void main() {
  bootstrap(AppComponent, const [
    // in-memory web api provider
    const Provider(BrowserClient,
        useFactory: HttpClientBackendServiceFactory, deps: const [])
    // TODO: drop `deps` once fix lands for 
    // https://github.com/angular/angular/issues/5266
  ]);
}
// #enddocregion final, in-mem-web-api-providers
/*
// #docregion v1

void main() {
  bootstrap(AppComponent, const [BrowserClient]);
}
// #enddocregion v1
*/
