// #docregion
library displaying_data.app_component_3;

// #docregion imports
import 'package:angular2/angular2.dart';
// #enddocregion imports
// #docregion import-hero
import 'package:displaying_data/hero.dart';

// #enddocregion import-hero

@Component(
    selector: 'my-app',
// #docregion template
    template: '''
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero.name}}</h2>
<p>Heroes:</p>
<ul>
  <li *ngFor="#hero of heroes">
    {{ hero.name }}
  </li>
</ul>'''
// #enddocregion template
    )
// #docregion heroes
final List<Hero> _heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(13, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];

// #enddocregion heroes
// #docregion class
class AppComponent {
  String title = 'Tour of Heroes';
  List<Hero> heroes = _heroes;
  Hero myHero = _heroes[0];
}
// #enddocregion class
// #enddocregion
