// #docregion
import 'package:angular2/angular2.dart';

import 'hero_list_component.dart';
import 'hero_service_provider.dart';

@Component(
    selector: 'my-heroes',
    template: '''
      <h2>Heroes</h2>
      <hero-list></hero-list>''',
    providers: const [heroServiceProvider],
    directives: const [HeroListComponent])
class HeroesComponent {}
