// #docregion
import { Injectable } from '@angular/core';

import { ConnectionBackend,
         Headers, Http,
         RequestOptions, RequestOptionsArgs} from '@angular/http';

import { Logger } from './logger.service';

@Injectable()
export class HttpInterceptService extends Http {
  private logger: Logger;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    logger: Logger) {

    defaultOptions = addOptions(defaultOptions) as RequestOptions;
    super(backend, defaultOptions );

    this.logger = logger;
    logger.log(`HttpInterceptService created with options ${JSON.stringify(defaultOptions)} `);
  }

  // Override individual methods or manipulate headers on the fly
  // Downside: you may have to override every method individually

  get(url: string, options?: RequestOptionsArgs) {
    options = addOptions(options);
    let desc = `HttpInterceptService#get: url: ${url} options: ${JSON.stringify(options)} `;
    this.logger.log(desc);
    return super.get(url, options);
  }
}

////// Private ///////////
function addOptions(options?: RequestOptionsArgs) {
  options = options || {};
  let headers = options.headers || new Headers();
  if (headers.get('foo') == null) {
    headers.append('foo', 'foo');
  }
  options.headers = headers;
  return options;
}
