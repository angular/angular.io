// #docregion
// #docregion importbootstrap
import {Component, bootstrap, provide} from 'angular2/angular2';
// #enddocregion importbootstrap

import {Phones} from './core/Phones';
// #docregion http-import
import {HTTP_PROVIDERS} from 'angular2/http';
// #enddocregion http-import
import PhoneList from './phone_list/PhoneList';
import PhoneDetail from './phone_detail/PhoneDetail';
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
  {path:'/', redirectTo: '/phones'}
])
@Component({
  selector: 'app',
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
