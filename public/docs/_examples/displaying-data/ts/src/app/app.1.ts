// #docregion
import {Component, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    `
  // #enddocregion template
})
export class AppComponent {
  title = 'Tour of Heroes';
  myHero = 'Windstorm';
}

bootstrap(AppComponent);
