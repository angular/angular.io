// #docregion
// #docregion routing-config
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';

const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
// #enddocregion routing-config

// #docregion routing-export
export const routing = RouterModule.forRoot(appRoutes);
// #enddocregion routing-export
