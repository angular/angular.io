import 'package:angular2/angular2.dart';
import 'hero_service.dart';
import 'hero_list_component.dart';

@Component(
    selector: 'my-toh',
// #docregion template
    template: '''
      <h1>Tour of Heroes</h1>
      <hero-list></hero-list>
    ''',
// #enddocregion template
    providers: const [HeroService],
    directives: const [HeroListComponent])
class TohComponent {}
// #enddocregion
