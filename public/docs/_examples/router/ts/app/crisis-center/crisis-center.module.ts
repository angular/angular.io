// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { CrisisService }        from './crisis.service';
// #docregion crisis-detail-resolve
import { CrisisDetailResolve }  from './crisis-detail-resolve.service';
// #enddocregion crisis-detail-resolve

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { crisisCenterRouting } from './crisis-center.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    crisisCenterRouting
  ],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisDetailComponent,
    CrisisAdminComponent
  ],
  // #docregion crisis-detail-resolve

  providers: [
    CrisisService,
    CrisisDetailResolve
  ]
  // #enddocregion crisis-detail-resolve
})
// #docregion crisis-center-module-export
export class CrisisCenterModule {}
// #enddocregion crisis-center-module-export
// #enddocregion
