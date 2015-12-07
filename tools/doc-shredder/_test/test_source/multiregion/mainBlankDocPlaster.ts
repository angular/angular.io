// no docplaster
// #docplaster
// #docregion import,twoparts
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
// #enddocregion twoparts,  import

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My first Angular 2 App</h1>'
})
class AppComponent {
}

// #docregion twoparts
   // indented comment
   var x = 3;
// #enddocregion

bootstrap(AppComponent);
// #docregion twoparts
// final comment
// #enddocregion twoparts


