```
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
	selector: 'app'
})
@View({
	template: '<h1 id="output">Hello {{ name }}</h1>'
})
export class AppComponent {
	name : string;

	constructor() {
		this.name = 'Alice';
	}
}

bootstrap(AppComponent);

```