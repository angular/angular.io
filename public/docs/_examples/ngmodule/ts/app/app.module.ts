// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

/* App Root */
import { AppComponent }   from './app.component';




/* Feature Modules */
import { ContactModule }  from './contact/contact.module';
import { SharedModule }   from './shared/shared.module';

import { routing }        from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ContactModule,
    routing,
    SharedModule.forRoot()
  ],
  declarations: [ AppComponent ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
