// #docregion silent-navigation
import {Component} from 'angular2/core';

@Component({
  selector: 'unauthorized',
  template: `
    <h2>You don't have sufficient access to this page.</h2>
    `
})
export class UnauthorizedComponent {}
