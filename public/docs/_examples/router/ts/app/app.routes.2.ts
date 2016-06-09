// #docplaster
// #docregion
// #docregion route-config
import { provideRouter, RouterConfig } from '@angular/router';

// #enddocregion route-config
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

// #docregion route-config
export const routes: RouterConfig = [
  { path: '/crisis-center', component: CrisisListComponent },
  { path: '/heroes', component: HeroListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
// #enddocregion route-config
