// #docregion
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full'},
// #docregion lazy-routes
  { path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module#HeroModule' }
// #enddocregion lazy-routes
];

// #docregion forRoot
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
// #enddocregion forRoot
