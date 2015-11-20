// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive.2'

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1><span highlight>Highlight me!</span>',
    directives: [Highlight]
})

class AppComponent { }

bootstrap(AppComponent);
// #enddocregion