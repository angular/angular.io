import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CrisisListComponent }    from './crisis-list.component';
import { CrisisDetailComponent }  from './crisis-detail.component';
import { CrisisService } from './crisis.service';
import { routing }       from './crisis.routing';

@NgModule({
  imports:      [ CommonModule, routing ],
  declarations: [ CrisisDetailComponent, CrisisListComponent ],
  providers:    [ CrisisService ]
})
export class CrisisModule {}
