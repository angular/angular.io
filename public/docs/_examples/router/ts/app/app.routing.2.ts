// #docplaster
// #docregion
import { ModuleWithProviders } from '@angular/core';
// #docregion route-config
import { Routes, RouterModule } from '@angular/router';

// #enddocregion route-config
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

// #docregion route-config
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
// #enddocregion route-config
