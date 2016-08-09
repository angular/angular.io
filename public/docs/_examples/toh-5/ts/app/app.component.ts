// #docplaster
// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  // #enddocregion template
  // #docregion style-urls
  styleUrls: ['app/app.component.css'],
  // #enddocregion style-urls
})
export class AppComponent {
  title = 'Tour of Heroes';
}
