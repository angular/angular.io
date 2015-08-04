// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
// #enddocregion

@Component({
	selector: 'my-app'
})
@View({
	template: '<h1 id="output">Hello {{ name }}</h1>'
})
class MyAppComponent {
	name : string;

	constructor() {
		this.name = 'Alice';
	}
}

// #docregion bootstrap
bootstrap(MyAppComponent);
// #enddocregion
