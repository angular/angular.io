 // export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()',
    '[attr.href]': 'visibleHref',
    '[class.router-link-active]': 'isRouteActive'
  }
})
export class FakeRouterLinkDirective  {

  isRouteActive = false;
  visibleHref: string; // the url displayed on the anchor element.

  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({selector: 'router-outlet', template: ''})
export class FakeRouterOutletComponent { }

@Injectable()
export class FakeRouter {
  lastCommand: any[];
  navigate(commands: any[], extras?: NavigationExtras) {
    this.lastCommand = commands;
    return commands;
  }
}

@Injectable()
export class FakeActivatedRoute {
  testParams: {} = {};

  get snapshot()  {
    return {
      params: this.testParams
    };
  }
}
