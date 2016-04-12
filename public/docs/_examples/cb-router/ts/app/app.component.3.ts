// #docregion
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from './home.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true }
])
export class AppComponent {}
