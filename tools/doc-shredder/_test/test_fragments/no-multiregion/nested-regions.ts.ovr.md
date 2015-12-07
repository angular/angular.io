```
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 id="output">My First Angular 2 App</h1>'
})
class AppComponent {
}

bootstrap(AppComponent);

```