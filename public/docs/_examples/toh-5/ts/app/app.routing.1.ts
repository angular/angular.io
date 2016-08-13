// #docregion , heroes
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';

const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
// #enddocregion heroes

export const routing = RouterModule.forRoot(appRoutes);
