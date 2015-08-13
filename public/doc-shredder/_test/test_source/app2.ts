// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion

//#docregion class-w-annotations
@Component({
    selector: 'my-app'
})
@View({
    template: '<h1 id="output">Hello, Angular 2!</h1>'
})
//#docregion class
class MyAppComponent {
}
//#enddocregion
//#enddocregion

//#docregion bootstrap
bootstrap(MyAppComponent);
//#enddocregion
//#enddocregion
