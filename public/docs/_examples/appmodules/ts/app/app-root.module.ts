// #docregion
import { AppModule, ApplicationRef } from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { FormsModule }               from '@angular/forms';
// import { HttpModule }                from '@angular/http';
import { RouterModule}               from '@angular/router';

import { AppComponent }              from './app.component';
import { appRouterProviders }        from './app.routes';
import { AwesomePipe }               from './awesome.pipe'
import { ContactModule }             from './contact/contact.module';
import { HighlightDirective }        from './highlight.directive';
import { UserService }               from './user.service';

@AppModule({
  modules: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ContactModule
  ],
  directives: [HighlightDirective],
  pipes:      [AwesomePipe],
  precompile: [AppComponent],
  providers:  [
    appRouterProviders,
    UserService,
    {provide: 'UserService', useExisting: UserService}
  ]
})
export class AppRootModule {
  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}
