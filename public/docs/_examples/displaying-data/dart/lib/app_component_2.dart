// #docregion
library displaying_data.app_component_2;

// #docregion imports
import 'package:angular2/angular2.dart';

// #enddocregion imports

@Component(
    selector: 'my-app',
// #docregion template
    template: '''
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero}}</h2>
<p>Heroes:</p>
<ul>
<!-- docregion li-repeater -->
  <li *ngFor="#hero of heroes">
    {{ hero }}
  </li>
<!-- enddocregion li-repeater -->
</ul>'''
// #enddocregion template
    )
// #docregion mock-heroes
const List<String> _heroes = const [
  'Windstorm',
  'Bombasto',
  'Magneta',
  'Tornado'
];

class AppComponent {
  String title = 'Tour of Heroes';
  List<String> heroes = _heroes;
  String myHero = _heroes[0];
}
// #enddocregion mock-heroes
// #enddocregion
