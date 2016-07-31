// #docregion
import { BrowserModule } from '@angular/platform-browser';
import { ExceptionHandler } from '@angular/core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomExceptionHandler } from './custom-exception-handler';
import { ErrorLoggingService } from './error-logging.service';

// #docregion module
@NgModule({
  imports: [ BrowserModule ],
  providers: [
    ErrorLoggingService,

    // In order to override the default ExceptionHandler service, we have to provide our
    // custom implementation as part of the application module - if we try to do this 
    // later on, in the App component, it will be too late.
    {
      provide: ExceptionHandler,
      useClass: CustomExceptionHandler
    }
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion module
