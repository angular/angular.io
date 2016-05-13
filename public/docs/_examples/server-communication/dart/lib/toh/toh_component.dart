// #docplaster
// #docregion
import 'package:angular2/core.dart';
import 'package:http/browser_client.dart';

import 'hero_list_component.dart';
import 'hero_service.dart';
// #enddocregion
// #docregion in-mem-web-api
/* ... */
import 'package:server_communication/hero_data.dart';
// #docregion

@Component(
    // #enddocregion in-mem-web-api
    selector: 'my-toh',
    // #docregion template
    template: '''
      <h1>Tour of Heroes</h1>
      <hero-list></hero-list>
    ''',
    // #enddocregion template
    directives: const [HeroListComponent],
    // #enddocregion
    // #docregion in-mem-web-api
    /* ... */
    // #docregion
    providers: const [
      HeroService,
      // #enddocregion
      // in-memory web api providers
      const Provider(BrowserClient,
          useFactory: HttpClientBackendServiceFactory)
    // #docregion
    ])
class TohComponent {}
