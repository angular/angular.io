// #docplaster
// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../interfaces';

export const crisisCenterRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'
  },
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      // #docregion admin-route-no-guard
      {
        path: 'admin',
        component: CrisisAdminComponent
      },
      // #enddocregion admin-route-no-guard
      {
        path: ':id',
        component: CrisisDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '',
        component: CrisisListComponent
      }
    ]
  }
];
// #enddocregion

/*
// #docregion auth-guard
import { AuthGuard }             from '../auth.guard';

{
  path: 'admin',
  component: CrisisAdminComponent,
  canActivate: [AuthGuard]
}
// #enddocregion auth-guard
*/
