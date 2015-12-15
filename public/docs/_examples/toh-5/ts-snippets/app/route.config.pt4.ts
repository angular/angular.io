// #docregion first-route
import {HeroesComponent} from './heroes.component';

export var Routes = {
  heroes: {
    path: '/,
    as: 'Heroes',
    component: HeroesComponent
  }
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
// #enddocregion first-route

// #docregion dashboard-route
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';

export var Routes = {
  dashboard: {
    path: '/', 
    as: 'Dashboard',
    component: DashboardComponent
  },
  heroes: {
    path: '/heroes',
    as: 'Heroes',
    component: HeroesComponent
  }
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
// #enddocregion dashboard-route

// #docregion route-parameter-import
import {HeroDetailComponent} from './hero-detail.component';
// #enddocregion route-parameter-import
// #docregion route-parameter-detail
detail: {
  path: '/detail/:id',
  as: 'Detail',
  component: HeroDetailComponent
}
// #docregion route-parameter-detail

// #docregion router-navigate-method
gotoDetail(hero: Hero) {
  this._router.navigate([`/${Routes.detail.as}`, { id: hero.id }]);
}
// #docregion router-navigate-method