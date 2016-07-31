// #docplaster
// #docregion
import { Component } from '@angular/core';

// #docregion component
@Component({
  selector: 'my-app',
  template:
  `
    <p>
      <a (click)="throwError()">Throw an Error</a> <em>(and watch console)</em>.
    </p>
  `
})
// #docregion class
export class AppComponent {
  constructor() {}

  public throwError() {
    throw(new Error('No Disassemble!'));
  }
}
// #enddocregion class
// #enddocregion component
