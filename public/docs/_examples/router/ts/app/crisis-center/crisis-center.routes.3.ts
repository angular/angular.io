// #docplaster
// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../interfaces';

export const CrisisCenterRoutes: RouterConfig = [
  {
    path: '/crisis-center',
    component: CrisisCenterComponent,
    index: true,
    children: [
      // #docregion admin-route-no-guard
      {
        path: '/admin',
        component: CrisisAdminComponent
      },
      // #enddocregion admin-route-no-guard
      {
        path: '/:id',
        component: CrisisDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '/',
        component: CrisisListComponent,
        index: true
      }
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
