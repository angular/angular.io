// #docregion , heroes, routing
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';

const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
// #enddocregion heroes, routing

// #docregion routing-export
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
// #enddocregion routing-export
