// #docregion
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'hero',
  template: `
    <h3>{{name}}</h3>
  `
})
export class Hero2Component {
  _name: string = '<no name set>';
  @Input() set name(newName: string) {
    if (newName && newName.trim() != '') {
      this._name = newName;
    }
  }
  
  get name() {
    return this._name;
  }
}
// #enddocregion
