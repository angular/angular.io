// Version #1
// #docregion
import {Component} from 'angular2/core'

@Component({
  selector: 'hero-birthday',
  // #docregion hero-birthday-template
  template: `<p>The hero's birthday is {{ birthday | date }}</p>`
  // #enddocregion hero-birthday-template
})
export class HeroBirthday {
  birthday = new Date(1988,3,15); // April 15, 1988
}
// #enddocregion