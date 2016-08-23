// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion

// #docregion class-w-annotations
@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My First Angular 2 App</h1>'
})
// #docregion class
class AppComponent {
}
// #enddocregion
// #enddocregion

// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion
// #enddocregion