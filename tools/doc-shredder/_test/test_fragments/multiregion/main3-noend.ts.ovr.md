```
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My first Angular 2 App</h1>'
})
class AppComponent {
}

   // indented comment
   var x = 3;
   // plaster should go immediately under here.
bootstrap(AppComponent);
// to be included in bootstrap...

```