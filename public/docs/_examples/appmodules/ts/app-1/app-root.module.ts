// #docregion
import { AppModule, ApplicationRef } from '@angular/core'
import { BrowserModule }             from '@angular/platform-browser';
import { FormsModule }               from '@angular/forms';

import { AppComponent }              from './app.component';

// Metadata for the root application module
@AppModule({
  // Platform setup for running in the browser.
  modules: [BrowserModule, FormsModule],

  // Root component(s) to be pre-compiled
  precompile: [AppComponent]
})
export class AppRootModule {
  constructor(appRef: ApplicationRef) {
    // bootstrap synchronously after asnchronous Angular compilation
    appRef.bootstrap(AppComponent);
  }
}
