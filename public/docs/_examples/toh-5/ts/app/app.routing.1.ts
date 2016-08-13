// #docregion
// #docregion config
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';

const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
// #enddocregion config

// #docregion export
export const routing = RouterModule.forRoot(appRoutes);
// #enddocregion export
