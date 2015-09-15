// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion import
// #docregion class-w-annotations
@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>My First Angular 2 App</h1>'
})
// #docregion class
class AppComponent { }
// #enddocregion class
// #enddocregion class-w-annotations

// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion bootstrap
