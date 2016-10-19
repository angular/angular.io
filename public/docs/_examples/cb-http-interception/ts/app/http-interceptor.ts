/////// Experimental Generic HttpInterceptor ////////

import { Injectable } from '@angular/core';

import { Connection, ConnectionBackend, Http,
         ReadyState, Request, RequestOptions,
         Response, XHRBackend } from '@angular/http';

import 'rxjs/add/observable/throw';

import { of }         from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

type interceptorFn = (act: HttpInterceptorActivity) => HttpInterceptorActivity;

@Injectable()
/**
 * Http Backend Interceptor raises request and response activity events.
 * Request interceptors can modify the request before it is sent (e.g, add headers) and can
 * set the activity response to bypass XHR and return the response immediately.
 * Response interceptors post-process responses before passing them to`http`.
 */
export class HttpInterceptor extends ConnectionBackend {

  private requestInterceptors:  interceptorFn[] = [];
  private responseInterceptors: interceptorFn[] = [];
  private responseErrorInterceptors: interceptorFn[] = [];

  private activitySubject = new Subject<HttpInterceptorActivity>();
  activity = this.activitySubject.asObservable();

  constructor(private xhrBackend: XHRBackend) { super(); }

  // Todo: remove interceptors?

  addRequestInterceptor(fn: interceptorFn) {
    this.requestInterceptors.push(fn);
  }

  addResponseInterceptor(fn: interceptorFn) {
    this.responseInterceptors.push(fn);
  }

  addResponseErrorInterceptor(fn: interceptorFn) {
    this.responseInterceptors.push(fn);
  }

  createConnection(request: Request): Connection {
    let act = new HttpInterceptorActivity(request);
    this.requestInterceptors.forEach(f => act = f(act) || act);
    this.activitySubject.next(act);

    // if request interceptor provided response, bypass XHR and return response immediately
    const connection  = act.response ?
      new InterceptorConnection(act) :
      this.xhrBackend.createConnection(act.request);

    connection.response = connection.response
      .map(res => {
        act.activityType = HttpInterceptorActivityType.Responded;
        act.response = res;
        this.responseInterceptors.forEach(f => act = f(act) || act);
        this.activitySubject.next(act);
        return act.response;
      })
      .catch(error => {
        act.activityType = HttpInterceptorActivityType.Failed;
        act.error = error;
        this.responseErrorInterceptors.forEach(f => act = f(act) || act);
        this.activitySubject.next(act);
        return act.activityType === HttpInterceptorActivityType.Failed ?
          Observable.throw(act.error) : of(act.response);
      });

    return connection;
  }
}

/**
 * Add these interceptor-related providers to the root AppModule's providers
 * and provide an `Http` that uses the HttpInterceptor
 */
export const HttpInterceptorProviders = [
  HttpInterceptor,
  { provide: Http, useFactory: httpFactory, deps: [HttpInterceptor, RequestOptions] }
];

///////////

function httpFactory(interceptor: HttpInterceptor, requestOptions: RequestOptions): Http {
  return new Http(interceptor, requestOptions);
}

export enum HttpInterceptorActivityType {
  Requested = 0,
  Responded = 1,
  Failed = 2
}

/**
 * Http interceptor activity event payload
 */
export class HttpInterceptorActivity {
  activityType = HttpInterceptorActivityType.Requested;
  response: Response;
  error: any;

  constructor(public request: Request) { }
}

const isSuccess = (status: number): boolean => (status >= 200 && status < 300);

/**
 * Internal: immediately returned Connection object when interceptor provides the response
 */
class InterceptorConnection extends Connection {
  response: Observable<Response>;

  constructor(activity: HttpInterceptorActivity) {
    super();
    this.readyState = ReadyState.Unsent;
    this.request    = activity.request;
    const response  = activity.response;
    this.response   = isSuccess(response.status) ? of(response) : Observable.throw(response);
  }
}
