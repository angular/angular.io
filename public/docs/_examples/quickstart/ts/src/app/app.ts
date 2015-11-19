// #docregion
import {bootstrap, Component} from 'angular2/angular2';

@Component({
	selector: 'my-app',
	template: '<h1>My First Angular 2 App</h1>'
})
class AppComponent { }

bootstrap(AppComponent);
