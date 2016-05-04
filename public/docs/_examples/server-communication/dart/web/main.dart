// #docregion
import 'package:angular2/platform/browser.dart';
import 'package:server_communication/toh/toh_component.dart';
import 'package:server_communication/wiki/wiki_component.dart';
import 'package:server_communication/wiki/wiki_smart_component.dart';
import 'package:http/browser_client.dart';
import 'package:angular2/core.dart';
import 'package:jsonpadding/jsonpadding.dart';

main() {
// #docregion http-providers
  bootstrap(TohComponent, [provide(BrowserClient, useValue: new BrowserClient())]);
// #enddocregion http-providers
  bootstrap(WikiComponent, [provide(Jsonp, useValue: new Jsonp())]);
  bootstrap(WikiSmartComponent, [provide(Jsonp, useValue: new Jsonp())]);
}
