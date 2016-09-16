 // export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()',
    '[attr.href]': 'href',
    '[class.router-link-active]': 'isRouteActive'
  }
})
export class RouterLinkDirectiveStub {

  isRouteActive = false;
  href: string; // the url displayed on the anchor element.

  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
  lastCommand: any[];
  navigate(commands: any[], extras?: NavigationExtras) {
    this.lastCommand = commands;
    return commands;
  }
}


// Only implements params and part of snapshot.params
// #docregion activated-route-stub
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}
// #enddocregion activated-route-stub
