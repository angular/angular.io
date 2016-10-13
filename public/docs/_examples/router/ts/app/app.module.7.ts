// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';

import { HeroesModule }        from './heroes/heroes.module';
import { CrisisCenterModule }  from './crisis-center/crisis-center.module';
import { LoginRoutingModule }  from './login-routing.module';
import { LoginComponent }       from './login.component';

import { DialogService }       from './dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
