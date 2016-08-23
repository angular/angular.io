// #docregion
import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/crisis-center/admin" routerLinkActive="active">Crisis Admin</a>
    </nav>
    <router-outlet></router-outlet>
  `
  // #enddocregion template
})
export class AppComponent {
}
