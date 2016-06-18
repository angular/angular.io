// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';

// #docregion routes
export const CrisisCenterRoutes: RouterConfig = [
  // #docregion redirect
  {
    path: '',
    redirectTo: '/crisis-center',
    terminal: true
  },
  // #enddocregion redirect
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      { path: ':id',  component: CrisisDetailComponent },
      { path: '',     component: CrisisListComponent }
    ]
  }
];
// #enddocregion routes
