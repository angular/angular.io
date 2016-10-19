// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';

import { HeroesModule }        from './heroes/heroes.module';
import { CrisisCenterModule }  from './crisis-center/crisis-center.module';
import { AdminModule }         from './admin/admin.module';

import { DialogService }       from './dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
