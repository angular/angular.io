// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive'

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1><span highlight="{{color}}">Highlight me!</span>',
    directives: [Highlight]
})

class AppComponent { 
	color = "cornsilk"
}

bootstrap(AppComponent);
// #enddocregion