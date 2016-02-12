// Early versions

// #docregion
import 'package:angular2/core.dart';
import 'car/car_component.dart';
import 'heroes/heroes_component_1.dart';

@Component(
    selector: 'my-app',
    template: '''
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-heroes></my-heroes>
  ''',
    directives: const [CarComponent, HeroesComponent])
class AppComponent {
  var title = 'Dependency Injection';
}
// #enddocregion

/*
//#docregion ctor-di-fail
// FAIL! Injectable `config` is not a class!
AppComponent(HeroService heroService, Map config) {
  title = config['title'];
}
//#enddocregion ctor-di-fail
*/
