// #docregion
import {Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [Highlight]
})

export class AppComponent { }

// #enddocregion