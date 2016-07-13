import { AppModule }         from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { provideRoutes,
         ROUTER_DIRECTIVES } from '@angular/router';

import { CrisisList }     from './crisis-list.component';
import { CrisisDetail }   from './crisis-detail.component';
import { CrisisService } from './crisis.service';

@AppModule({
  directives: [ROUTER_DIRECTIVES],
  modules: [BrowserModule],
  providers: [
    CrisisService,
    provideRoutes([
      { path: '',    component: CrisisList },
      { path: ':id', component: CrisisDetail }
    ])
  ]
})
export class CrisisCenterModule {}
