//// Example Application Interceptors ////

import { Injectable } from '@angular/core';
import { RequestMethod, Response, ResponseOptions } from '@angular/http';
import { HttpInterceptorActivity, HttpInterceptorActivityType,  HttpInterceptor } from './http-interceptor';

import { Hero } from './hero';

/**
 * Log http activity
 */
@Injectable()
export class HttpActivityLogger {
  logs: string[] = [];
  log(act: HttpInterceptorActivity) {
    const msg = activityToString(act);
    console.log(msg, act);
    this.logs.push(msg);
  }
}

/**
 * Register HttpInterceptors (hard coded in this example)
 */
@Injectable()
export class HttpInterceptorRegistryService {
  constructor(private httpInterceptor: HttpInterceptor, private logger: HttpActivityLogger) {}

  register() {
    // Log every activity
    this.httpInterceptor.activity.subscribe(act => this.logger.log(act));

    this.httpInterceptor.addRequestInterceptor(addTokenInterceptor);
    this.httpInterceptor.addRequestInterceptor(forbidDeleteInterceptor);
    this.httpInterceptor.addResponseInterceptor(reverseHeroNamesInterceptor);
  }
}

//// HttpInterceptors for this sample ///

// Intercept every request and add custom header
function addTokenInterceptor(act: HttpInterceptorActivity) {
  act.request.headers.append('X-CUSTOM-TOKEN', 'my custom token');
  return act;
}

// Forbid deletion of Hero #1
function forbidDeleteInterceptor(act: HttpInterceptorActivity) {
  if (
    act.request.method === RequestMethod.Delete &&
    act.request.url    === 'app/heroes/1'
  ) {
    const options = new ResponseOptions({
      status: 405,
      statusText: 'Forbidden',
      body: {error: 'Hero #1 can not be deleted'}
    });
    act.response = new Response(options);
  }
  return act;
}

// Reverse the names of heroes when get all heroes from the server
function reverseHeroNamesInterceptor(act: HttpInterceptorActivity) {
  const res = act.response;
   if (
    act.request.method === RequestMethod.Get &&
    act.request.url    === 'app/heroes'
  ) {
    const heroes: Hero[] = res.json().data;
    const data = { data: heroes.map(h => reverseHeroName(h)) };
    res.json = () => data;
  }
  return act;

  function reverseHeroName(hero: Hero) {
    hero.name = hero.name.split('').reverse().join('');
    return hero;
  }
}

/// Private helpers ///

// Represent interceptor activity as a string
function activityToString(act: HttpInterceptorActivity) {
  const emsg = getErrorMessage(act);
  const activityType = HttpInterceptorActivityType[act.activityType];
  const requestMethod = RequestMethod[act.request.method].toUpperCase();
  return `${activityType} ${requestMethod} for url: ${act.request.url} ${emsg}`;
}

// Dig out the Http error message
function getErrorMessage(act: HttpInterceptorActivity) {
  let errMsg = '';
  const error = act.error;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else if (error) {
    errMsg = error.message ? error.message : error;
  }
  return errMsg;
}

