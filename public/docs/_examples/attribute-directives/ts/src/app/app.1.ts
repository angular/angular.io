// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive'

@Component({
    selector: 'my-app',
    template: `
    <h1>My First Attribute Directive</h1>
    <span highlight>Highlight me!</span>
    `,
    directives: [Highlight]
})

class AppComponent { }

bootstrap(AppComponent);
// #enddocregion