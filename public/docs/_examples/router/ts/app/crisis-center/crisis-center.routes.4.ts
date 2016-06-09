// #docplaster
// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../auth.guard';

export const CrisisCenterRoutes: RouterConfig = [
  {
    path: '/crisis-center',
    component: CrisisCenterComponent,
    index: true,
    children: [
      {
        path: '/admin',
        component: CrisisAdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '/:id',
        component: CrisisDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      // #docregion default-route
      {
        path: '/',
        component: CrisisListComponent,
        index: true
      }
      // #enddocregion default-route
    ]
  }
];
// #enddocregion

/*
// #docregion auth-guard
import { AuthGuard }             from '../auth.guard';

{
  path: '/admin',
  component: CrisisAdminComponent,
  canActivate: [AuthGuard]
}
// #enddocregion auth-guard
*/
