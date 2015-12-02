// #docregion pt1
import {bootstrap, Component, FORM_DIRECTIVES} from 'angular2/angular2';

class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <div><input [(ng-model)]="hero.name" placeholder="name"></div>
    </div>
    `,
  directives: [FORM_DIRECTIVES]
})
class AppComponent {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}

bootstrap(AppComponent);
// #enddocregion pt1
// #docregion hero-array
var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
// #enddocregion hero-array