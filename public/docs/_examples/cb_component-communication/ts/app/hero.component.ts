// #docregion
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'hero',
  template: `
    <h3>{{name}} says:</h3>
    <p>{{greetMaster()}}</p>
  `
})
export class HeroComponent {
  @Input() name: string;
  @Input('master-name') master: string;
  
  greetMaster() {
    return `I, ${this.name}, am at your service, ${this.master}.`
  }
}
// #enddocregion
