import {bootstrap, Component} from 'angular2/angular2';

import {Router, RouteConfig, RouteDefinition,
        ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
        RouterOutlet} from 'angular2/router';

import {ROUTES, LINKS} from './router.config';



@Component({
  selector: 'my-app',
  template:
    '<h1 class="title"><a href="/src/">Component Communication</a></h1>' +
    '<div class="links">' + LINKS.join(' ') + '</div>' +
    '<router-outlet></router-outlet>',
  styleUrls: ['app/hero-job-board.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(ROUTES)
class AppComponent { }

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);