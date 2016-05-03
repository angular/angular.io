// #docregion
import {Component, Input} from '@angular/core';

@Component({
  selector: 'name-child',
  template: `
    <h3>"{{name}}"</h3>
  `
})
export class NameChildComponent {
  _name: string = '<no name set>';

  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name() { return this._name; }
}
// #enddocregion
