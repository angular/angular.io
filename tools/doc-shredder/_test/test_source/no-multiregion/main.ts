// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My first Angular App</h1>'
})
class AppComponent {
}
// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion
