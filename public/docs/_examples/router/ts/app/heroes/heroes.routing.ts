// #docregion
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
// #docregion hero-detail-route
  { path: 'hero/:id', component: HeroDetailComponent }
// #enddocregion hero-detail-route
];

export const heroesRouting = RouterModule.forChild(heroesRoutes);
// #enddocregion
