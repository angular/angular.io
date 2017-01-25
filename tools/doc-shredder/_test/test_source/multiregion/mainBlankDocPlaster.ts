// no docplaster
// #docplaster
// #docregion import,twoparts
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion twoparts,  import

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My first Angular App</h1>'
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


