// #docregion
import 'package:angular2/core.dart';

// #docregion mock-heroes
const List<String> _heroes = const [
  'Windstorm',
  'Bombasto',
  'Magneta',
  'Tornado'
];
// #enddocregion mock-heroes

@Component(
    selector: 'my-app',
// #docregion template
    template: '''
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero}}</h2>
<p>Heroes:</p>
<ul>
// #docregion li-repeater
  <li *ngFor="#hero of heroes">
    {{ hero }}
  </li>
// #enddocregion li-repeater
</ul>'''
// #enddocregion template
    )
// #docregion mock-heroes
class AppComponent {
  String title = 'Tour of Heroes';
  List<String> heroes = _heroes;
  String myHero = _heroes[0];
}
// #enddocregion mock-heroes
// #enddocregion
