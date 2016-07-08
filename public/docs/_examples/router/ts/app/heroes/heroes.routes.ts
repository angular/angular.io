// #docregion
import { RouterConfig }          from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';

export const heroesRoutes: RouterConfig = [
  { path: 'heroes',  component: HeroListComponent },
// #docregion hero-detail-route
  { path: 'hero/:id', component: HeroDetailComponent }
// #enddocregion hero-detail-route
];
// #enddocregion
