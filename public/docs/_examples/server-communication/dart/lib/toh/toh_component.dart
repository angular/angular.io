import 'package:angular2/core.dart';
import 'package:http_in_memory_web_api/http_in_memory_web_api.dart';
import 'package:http/browser_client.dart';
import 'package:server_communication/hero_data.dart';

import 'hero_list_component.dart';
import 'hero_service.dart';

@Injectable()
HttpClientInMemoryBackendService HttpClientInMemoryBackendServiceFactory() =>
    new HttpClientInMemoryBackendService(heroData); // in-mem server

@Component(
    selector: 'my-toh',
// #docregion template
    template: '''
      <h1>Tour of Heroes</h1>
      <hero-list></hero-list>
    ''',
// #enddocregion template
    providers: const [
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
    ])
class TohComponent {}
// #enddocregion
