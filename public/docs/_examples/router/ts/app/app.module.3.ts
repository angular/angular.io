// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }       from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';

import { HeroesModule }           from './heroes/heroes.module';
import { CrisisCenterModule }     from './crisis-center/crisis-center.module';

import { DialogService }  from './dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HeroesModule,
    CrisisCenterModule
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
