// #docplaster
// #docregion
// #docregion route-config
import { RouterConfig } from '@angular/router';

// #enddocregion route-config
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

// #docregion route-config
export const routes: RouterConfig = [
  { path: '/crisis-center', component: CrisisListComponent },
  { path: '/heroes', component: HeroListComponent }
];
// #enddocregion route-config
