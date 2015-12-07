// #docregion
// #docregion import
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
// #enddocregion

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My first Angular 2 App</h1>'
})
class AppComponent {
}
// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion