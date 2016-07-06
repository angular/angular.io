// #docregion
import { provideRouter, RouterConfig }  from '@angular/router';

import { MovieListComponent } from './movie-list.component';

const routes: RouterConfig = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
