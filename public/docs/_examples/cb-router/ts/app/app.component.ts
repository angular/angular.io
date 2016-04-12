// #docregion
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {RestrictedComponent} from './restricted.component';
import {UnauthorizedComponent} from './unauthorized.component';
import {HomeComponent} from './home.component';
import {NavigatingComponent} from './navigating.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, NavigatingComponent],
  template: `
    <h1>Router Cookbook</h1>
    <navigating></navigating>
    <h3 class="header">Current Path: {{ path }}</h3>
    <h3 class="header">Current URL: {{ url }}</h3>
    <nav>
      <a [routerLink]="['Home']">Home</a>
      <a [routerLink]="['Restricted']">Restricted</a>
    </nav>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
  { path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/restricted', component: RestrictedComponent, name: 'Restricted' },
  { path: '/unauthorized', component: UnauthorizedComponent, name: 'Unauthorized' }
])
export class AppComponent {
  url: string;
  path: string;
  constructor(router: Router, location: Location) {
    router.subscribe((url: string) => {
      this.url = `/${url}`;
      this.path = location.path();
    });
  }
}
