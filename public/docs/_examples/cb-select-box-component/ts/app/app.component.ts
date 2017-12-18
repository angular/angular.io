// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Favorite Hero</h1>
    <my-select-verbose></my-select-verbose>
    <hr>
    <my-selector-host></my-selector-host>
  `
})
export class AppComponent {}
// #enddocregion
