// #docregion
import 'package:angular2/angular2.dart';
import 'package:angular2/bootstrap.dart';
import 'package:http/browser_client.dart';
import 'package:http_in_memory_web_api/http_in_memory_web_api.dart';
import 'package:server_communication/toh/toh_component.dart';
import 'package:server_communication/hero_data.dart';
import 'package:server_communication/wiki/wiki_component.dart';
import 'package:server_communication/wiki/wiki_smart_component.dart';

main() {
  bootstrap(TohComponent, [
//#enddocregion
//#docregion in-mem-web-api-providers
// in-memory web api providers
    provide(BrowserClient,
        useValue:
            new HttpClientInMemoryBackendService(heroData)), // in-mem server
//#enddocregion in-mem-web-api-providers
//#docregion
  ]);

  bootstrap(WikiComponent);
  bootstrap(WikiSmartComponent);
}
