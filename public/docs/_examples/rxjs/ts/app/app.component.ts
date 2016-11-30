// #docplaster
// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">RxJS in Angular</h1>

    <a routerLink="/heroes">Heroes</a><br>
    <a routerLink="/heroes/add">Add Hero</a><br>
    <a routerLink="/heroes/search">Hero Search</a>

    <router-outlet></router-outlet>

    <loading-component></loading-component>
  `
})
export class AppComponent {
}
