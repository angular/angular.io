// #docregion
// #docregion import
import {View, bootstrap} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
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