// #docregion
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from './home.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h3 class="header">Current URL: {{ url }}</h3>
    <nav>
      <a [routerLink]="['Home']">Home</a>
    </nav>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
  { path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true }
])
export class AppComponent {
  url: string;
  constructor(router: Router) {
    router.subscribe((url: string) => {
      this.url = `/${url}`;
    });
  }
}
