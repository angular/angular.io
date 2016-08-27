// #docplaster
// #docregion
// #docregion crisis-center-module, admin-module
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AppComponent }           from './app.component';
import { routing,
         appRoutingProviders }    from './app.routing';

import { HeroesModule }           from './heroes/heroes.module';
// #docregion crisis-center-module
import { CrisisCenterModule }     from './crisis-center/crisis-center.module';
// #enddocregion crisis-center-module
// #docregion admin-module
import { AdminModule }            from './admin/admin.module';
// #docregion crisis-center-module

import { DialogService }          from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HeroesModule,
    CrisisCenterModule,
// #enddocregion crisis-center-module
    AdminModule
// #docregion crisis-center-module
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
// #enddocregion
