// #docplaster
// #docregion
// #docregion v4
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

/* App Root */
import { AppComponent }   from './app.component';

/* Feature Modules */
import { ContactModule }  from './contact/contact.module';
import { CoreModule }     from './core/core.module';
import { routing }        from './app.routing';

@NgModule({
  // #docregion import-for-root
  imports: [
    BrowserModule,
    ContactModule,
// #enddocregion v4
// #enddocregion
// #enddocregion import-for-root
/*
// #docregion v4
    CoreModule,
// #enddocregion v4
*/
// #docregion import-for-root
// #docregion
    CoreModule.forRoot({userName: 'Miss Marple'}),
// #docregion v4
    routing
  ],
  // #enddocregion import-for-root
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
// #enddocregion v4
// #enddocregion
