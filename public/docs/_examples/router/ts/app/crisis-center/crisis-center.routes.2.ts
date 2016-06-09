// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';

// #docregion routes
export const CrisisCenterRoutes: RouterConfig = [
  {
    path: '/crisis-center',
    component: CrisisCenterComponent,
    index: true,
    children: [
      { path: '/:id',  component: CrisisDetailComponent },
      { path: '/',     component: CrisisListComponent,
        index: true
      }
    ]
  }
];
// #enddocregion routes

