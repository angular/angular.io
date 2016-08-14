// #docplaster
// #docregion
import { ModuleWithProviders } from '@angular/core';
// #docregion route-config
import { Routes, RouterModule } from '@angular/router';

// #enddocregion route-config
// #enddocregion

// #docregion base-routes
import { HeroListComponent }     from './hero-list.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { HeroDetailComponent }   from './heroes/hero-detail.component';
import { PageNotFoundComponent } from './not-found.component';
// #enddocregion base-routes

// #docregion
// #docregion route-config
const appRoutes: Routes = [
  // #docregion route-defs
  { path: 'crisis-center', component: CrisisCenterComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: {
      title: 'Heroes List'
    }
  },
  // #enddocregion route-defs
  // #docregion hero-detail-route
  { path: 'hero/:id', component: HeroDetailComponent },
  // #enddocregion hero-detail-route
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
// #enddocregion route-config
// #enddocregion
