// #docregion
// #docregion importbootstrap
import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {Phones} from './core/Phones';
import PhoneList from './phone_list/PhoneList';
import PhoneDetail from './phone_detail/PhoneDetail';
// #enddocregion importbootstrap

// #docregion http-import
import {HTTP_PROVIDERS} from 'angular2/http';
// #enddocregion http-import

// #docregion router-import
import {
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS
} from 'angular2/router';
// #enddocregion router-import

// #docregion appcomponent
@RouteConfig([
  {path:'/phones', as: 'Phones', component: PhoneList},
  {path:'/phones/:phoneId', as: 'Phone', component: PhoneDetail},
  {path:'/', redirectTo: ['/phones']}
])
@Component({
  selector: 'pc-app',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
class AppComponent {
}
// #enddocregion appcomponent

// #docregion bootstrap
bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  Phones
]);
// #enddocregion bootstrap
