// #docplaster
// #docregion
import { Routes, RouterModule } from '@angular/router';

import { CrisisListComponent } from './crisis-center/crisis-list.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
