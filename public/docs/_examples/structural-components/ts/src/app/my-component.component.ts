// #docregion
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'my-component',
  template: '<p>{{content}}</p>'
})
export class MyComponent {
  @Input() content='Component Template Content';
}
// #enddocregion

@Component({
  selector: 'my-component-host',
  templateUrl: 'app/my-component.component.html',
  directives:[MyComponent]
})
export class MyComponentHost { }