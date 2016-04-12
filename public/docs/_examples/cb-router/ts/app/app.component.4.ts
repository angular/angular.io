// #docregion silent-navigation
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {RestrictedComponent} from './restricted.component';
import {UnauthorizedComponent} from './unauthorized.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h3 class="header">Current Path: {{ path }}</h3>
    <h3 class="header">Current URL: {{ url }}</h3>
    <nav>
      <a [routerLink]="['/Restricted']">Restricted</a>
    </nav>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
  { path: '/restricted', component: RestrictedComponent, name: 'Restricted' },
  { path: '/unauthorized', component: UnauthorizedComponent, name: 'Unauthorized' }
])
export class AppComponent {
  url: string;
  path: string;
  constructor(router: Router, location: Location) {
    router.subscribe((url: string) => {
      this.url = `${url}`;
      this.path = location.path();
    });
  }
}
