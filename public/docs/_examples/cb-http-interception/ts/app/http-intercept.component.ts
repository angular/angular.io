// #docregion
import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { HttpInterceptService } from './http-intercept.service';

import { HeroListComponent }  from './hero-list.component';

@Component({
  selector: 'http-intercept',
  template: `
    <h1>Http Intercept</h1>
    <hero-list></hero-list>
  `,
  directives: [ HeroListComponent ],
  providers:  [ {provide: Http, useClass: HttpInterceptService} ]
})
export class HttpInterceptComponent { }
