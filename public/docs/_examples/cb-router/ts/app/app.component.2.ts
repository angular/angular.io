// #docregion
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from './home.component';
import {NavigatingComponent} from './navigating.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, NavigatingComponent],
  template: `
    <navigating></navigating>
    <nav>
      <a [routerLink]="['Home']">Home</a>
    </nav>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
  { path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true }
])
export class AppComponent {}
