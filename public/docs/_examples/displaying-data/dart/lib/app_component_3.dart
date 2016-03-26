// #docregion
import 'package:angular2/core.dart';
// #docregion heroes
import 'hero.dart';

final List<Hero> _heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(13, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];
// #enddocregion heroes

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
class AppComponent {
  String title = 'Tour of Heroes';
  List<Hero> heroes = _heroes;
  Hero myHero = _heroes[0];
}
// #enddocregion heroes
// #enddocregion
