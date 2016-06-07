// #docregion
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';

@RouteConfig([
  {path: '/phones', name: 'Phones', component: PhoneListComponent},
  {path: '/phones/:phoneId', name: 'Phone', component: PhoneDetailComponent},
  {path: '/', redirectTo: ['Phones']}
])
@Component({
  selector: 'phonecat-app',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
