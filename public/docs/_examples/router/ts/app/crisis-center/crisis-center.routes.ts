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
      // #docregion admin-route
      {
        path: '/admin',
        component: CrisisAdminComponent,
        canActivate: [AuthGuard]
      },
      // #enddocregion admin-route
      {
        path: '/:id',
        component: CrisisDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '/',
        component: CrisisListComponent,
        index: true
      }
    ]
  }
];
