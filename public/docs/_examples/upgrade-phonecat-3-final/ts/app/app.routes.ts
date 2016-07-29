// #docregion
import { provideRouter, RouterConfig } from '@angular/router';

import { PhoneListComponent } from './phone-list/phone-list.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';

const routes: RouterConfig = [
  { path: '', redirectTo: 'phones', pathMatch: 'full' },
  { path: 'phones', component: PhoneListComponent },
  { path: 'phones/:phoneId', component: PhoneDetailComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
