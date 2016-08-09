// #docregion
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { CrisisService }        from './crisis.service';

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';

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
    CrisisDetailComponent
  ],
// #docregion providers
  providers: [
    CrisisService
  ]
// #enddocregion providers
})
export class CrisisCenterModule {}
// #enddocregion
