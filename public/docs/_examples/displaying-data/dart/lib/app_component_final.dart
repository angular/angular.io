// #docregion
library displaying_data.app_component_final;

import 'package:angular2/angular2.dart';
import 'package:displaying_data/hero.dart';

final List<Hero> _heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(13, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];

@Component(
    selector: 'my-app',
    template: '''
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero.name}}</h2>
<p>Heroes:</p>
<ul>
  <li *ng-for="#hero of heroes">
    {{ hero.name }}
  </li>
</ul>
<p *ng-if="heroes.length > 3">There are many heroes!</p>''',
    directives: const [CORE_DIRECTIVES])
class AppComponent {
  String title = 'Tour of Heroes';
  List<Hero> heroes = _heroes;
  Hero myHero = _heroes[0];
}
// #enddocregion
