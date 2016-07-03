// #docregion
import 'package:angular2/core.dart';
// #docregion import
import 'hero.dart';
// #enddocregion import

@Component(
    selector: 'my-app',
    // #docregion template
    template: '''
      <h1>{{title}}</h1>
      <h2>My favorite hero is: {{myHero.name}}</h2>
      <p>Heroes:</p>
      <ul>
        <li *ngFor="let hero of heroes">
          {{ hero.name }}
        </li>
      </ul>
    '''
    // #enddocregion template
    )
// #docregion class
class AppComponent {
  String title = 'Tour of Heroes';
  // #docregion heroes
  List<Hero> heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  Hero get myHero => heroes.first;
  // #enddocregion heroes
}
