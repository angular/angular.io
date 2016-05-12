// #docplaster

// #docregion
// #docregion in-mem-web-api-imports
import 'package:angular2/core.dart';

// in-memory web api imports
import 'package:http_in_memory_web_api/http_in_memory_web_api.dart';
import 'package:http/browser_client.dart';
import 'package:server_communication/hero_data.dart';
import 'hero_list_component.dart';
// #enddocregion in-mem-web-api-imports
import 'hero_service.dart';

// #enddocregion
//#docregion in-mem-web-api-providers
HttpClientInMemoryBackendService HttpClientInMemoryBackendServiceFactory() =>
    new HttpClientInMemoryBackendService(heroData); // in-mem server

//#enddocregion in-mem-web-api-providers
// #docregion
//#docregion in-mem-web-api-providers
@Component(
//#enddocregion in-mem-web-api-providers
    selector: 'my-toh',
// #docregion template
    template: '''
      <h1>Tour of Heroes</h1>
      <hero-list></hero-list>
    ''',
// #enddocregion template
    providers: const [
      BrowserClient,
      HeroService,
//#enddocregion
//#docregion in-mem-web-api-providers
      // in-memory web api providers
      const Provider(BrowserClient,
          useFactory: HttpClientInMemoryBackendServiceFactory)
//#enddocregion in-mem-web-api-providers
//#docregion
    ],
    directives: const [
      HeroListComponent
    ]
//#docregion in-mem-web-api-providers
)
//#enddocregion in-mem-web-api-providers
class TohComponent {}
// #enddocregion
