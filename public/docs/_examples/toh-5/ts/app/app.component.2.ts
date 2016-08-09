// #docplaster
// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <a routerLink="/heroes">Heroes</a>
    <router-outlet></router-outlet>
  `
  // #enddocregion template
})
export class AppComponent {
  title = 'Tour of Heroes';
}
