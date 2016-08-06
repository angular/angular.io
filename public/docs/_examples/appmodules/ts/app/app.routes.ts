// #docregion
import { provideRoutes, RouterConfig } from '@angular/router';

import { ContactComponent }            from './contact/contact.component';

export const appRoutes: RouterConfig = [
  { path: '', redirectTo: 'contact', pathMatch: 'full'},
  { path: 'contact', component: ContactComponent},
  { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module' }
];

export const appRouterProviders = [
  provideRoutes(appRoutes)
];
