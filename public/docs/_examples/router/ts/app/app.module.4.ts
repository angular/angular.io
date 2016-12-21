// #docplaster
// #docregion
// #docregion crisis-center-module, admin-module
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AppComponent }            from './app.component';
import { PageNotFoundComponent }   from './not-found.component';

import { AppRoutingModule }        from './app-routing.module';
import { HeroesModule }            from './heroes/heroes.module';
// #docregion crisis-center-module
import { CrisisCenterModule }      from './crisis-center/crisis-center.module';
// #enddocregion crisis-center-module
import { ComposeMessageComponent } from './compose-message.component';
// #docregion admin-module
import { AdminModule }             from './admin/admin.module';
// #docregion crisis-center-module

import { DialogService }           from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
// #enddocregion crisis-center-module
// #enddocregion admin-module
    AdminModule,
// #docregion crisis-center-module
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
// #enddocregion admin-module, crisis-center-module
    ComposeMessageComponent,
// #docregion admin-module, crisis-center-module
    PageNotFoundComponent
  ],
  providers: [
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion
