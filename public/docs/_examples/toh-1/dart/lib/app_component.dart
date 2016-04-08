// #docregion pt1
import 'package:angular2/core.dart';

// #docregion hero-class-1
class Hero {
  final int id;
  String name;

  Hero(this.id, this.name);
}
// #enddocregion hero-class-1

@Component(
    selector: 'my-app',
    template: '''
      <h1>{{title}}</h1>
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <div><input [(ngModel)]="hero.name" placeholder="name"></div>
      </div>'''
)
class AppComponent {
  String title = 'Tour of Heroes';
  Hero hero = new Hero(1, 'Windstorm');
}
// #enddocregion pt1
