// #docplaster
// #docregion
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
import { ManageCrisesComponent }    from './manage-crises.component';
import { ManageHeroesComponent }    from './manage-heroes.component';

// #docregion admin-route
import { AuthGuard }                from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            canActivateChild: [AuthGuard],
            children: [
              { path: 'crises', component: ManageCrisesComponent },
              { path: 'heroes', component: ManageHeroesComponent },
              { path: '', component: AdminDashboardComponent }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
// #enddocregion
