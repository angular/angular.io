// #docregion
import { provideRouter, RouterConfig }  from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
// #docregion hero-detail-import
import { HeroDetailComponent } from './hero-detail.component';
// #enddocregion hero-detail-import

const routes: RouterConfig = [
  // #docregion redirect-route
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // #enddocregion redirect-route
  // #docregion dashboard-route
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  // #enddocregion dashboard-route
  // #docregion hero-detail-route
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  // #enddocregion hero-detail-route
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
