import {Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ROUTE_NAMES, ROUTES} from './routes';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <a [router-link]="[routes.dashboard]">Dashboard</a>
    <a [router-link]="[routes.heroes]">Heroes</a>
    <router-outlet></router-outlet>
  `,
  styles: [`
    a {padding: 5px;text-decoration: none;}
    a:visited, a:link {color: #444;}
    a:hover {color: white; background-color: #1171a3;}
    a.router-link-active {color: white; background-color: #52b9e9;}
  `],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(ROUTES)
export class AppComponent {
  public title = 'Tour of Heroes';
  public routes = ROUTE_NAMES;
}
