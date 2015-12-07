// #docplaster more code here
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
   // plaster should go immediately under here.
// #enddocregion
// #docregion bootstrap, twoparts
bootstrap(AppComponent);
// #enddocregion twoparts
// to be included in bootstrap...
// #enddocregion
