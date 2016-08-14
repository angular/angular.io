// #docplaster
// #docregion
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisListComponent } from './crisis-center/crisis-list.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
