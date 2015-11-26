import {bootstrap, Component} from 'angular2/angular2'
// #docregion
@Component({ 
  selector: 'hero-birthday',
  template: `
    <p>The hero's birthday is {{ birthday | date:format }}</p>
    <button (click)="toggleFormat()">Toggle Format</button>
  ` 
})
export class HeroBirthday {
  birthday = new Date(1988,3,15); // April 15, 1988
  get format() { return this.toggle ? 'shortDate' : 'fullDate'}
  toggle = true;
  toggleFormat() { this.toggle = !this.toggle; }  
}
// #enddocregion
