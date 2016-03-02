import {Component, provide} from 'angular2/core';
import {Router, RouteConfig, RouteDefinition,
        ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
        APP_BASE_HREF,
        RouterOutlet} from 'angular2/router';

import {ROUTES, LINKS} from './router.config';

@Component({
  selector: 'my-app',
  template:
    '<h1 class="title"><a href=".">Component Communication</a></h1>' +
    '<div class="links">' + LINKS.join(' ') + '</div>' +
    '<router-outlet></router-outlet>',
  styleUrls: ['app/hero-job-board.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(ROUTES)
export class AppComponent { }
