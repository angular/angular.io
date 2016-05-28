// #docregion
import { Component }  from '@angular/core';
import { Http,
         RequestOptions }     from '@angular/http';

import { RequestOptionsInterceptX } from './request-options-intercept';
import { RequestOptionsIntercept } from './request-options-intercept';
import { HeroListComponent }  from './hero-list.component';

@Component({
  selector: 'request-options-intercept',
  template: `
    <h1>RequestOptions Intercept</h1>
    <hero-list></hero-list>
  `,
  directives: [ HeroListComponent ],
  providers:  [
   {provide: RequestOptions, useClass: RequestOptionsIntercept},
    // {provide: RequestOptions, useClass: RequestOptionsInterceptX},
    Http
  ]
})
export class RequestInterceptComponent { }
