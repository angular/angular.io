// #docregion
import { RouterConfig }  from '@angular/router';

import { MovieListComponent } from './movie-list.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent }
];
