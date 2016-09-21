// #docplaster
// #docregion , heroes
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// #enddocregion heroes
import { DashboardComponent }   from './dashboard.component';
// #docregion heroes
import { HeroesComponent }      from './heroes.component';
// #enddocregion heroes
import { HeroDetailComponent }  from './hero-detail.component';
// #docregion heroes

const appRoutes: Routes = [
  // #enddocregion heroes
  // #docregion redirect
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // #enddocregion redirect
  // #docregion dashboard
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  // #enddocregion dashboard
  // #docregion hero-detail
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  // #enddocregion hero-detail
  // #docregion heroes
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
// #enddocregion heroes

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
