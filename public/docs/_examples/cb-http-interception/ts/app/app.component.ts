// #docplaster
// #docregion
import { Component } from '@angular/core';
import './rxjs-operators'; // RxJS Observable operators we need in this app.

import { Logger }                     from './logger.service';

import { BackendInterceptComponent }  from './backend-intercept.component';
import { HttpInterceptComponent }     from './http-intercept.component';
import { RequestInterceptComponent }  from './request-options-intercept.component';

@Component({
  selector: 'my-app',
  template: `
    <h2>Logs:</h2>
    <div *ngFor="let log of logs">{{log}}</div>
    <request-options-intercept></request-options-intercept>
    <http-intercept></http-intercept>
    <backend-intercept></backend-intercept>
  `,
  directives: [
    BackendInterceptComponent,
    // HttpInterceptComponent,
    RequestInterceptComponent
  ],
  providers: [ Logger ]
})
export class AppComponent {
  logs: string[] = [];

  constructor(logger: Logger) {
    logger.log('Application started');
    this.logs = logger.logs;
  }
}
