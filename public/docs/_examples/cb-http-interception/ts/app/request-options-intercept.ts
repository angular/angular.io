// #docregion
import { Injectable }          from '@angular/core';
import { BaseRequestOptions }  from '@angular/http';
import { Logger }              from './logger.service';

// This bombs because logger is undefined, rather than injected
@Injectable()
export class RequestOptionsIntercept extends BaseRequestOptions {
  constructor(logger: Logger) {
    super();
    this.headers.append('foo', 'foo');
    console.log(`RequestOptionsIntercept created: ${JSON.stringify(this)} `);
    // UNCOMMENT TO SEE IT BOMB
    // logger.log(`RequestOptionsIntercept created: ${JSON.stringify(this)} `);
  }
}

//// DELETE AFTER LOGGER INJECTION SOLVED ////
// This works

import { Headers }         from '@angular/http';
import { RequestOptions }  from '@angular/http';

@Injectable()
export class RequestOptionsInterceptX extends RequestOptions {
  constructor(logger: Logger) {
    super();
    this.headers = new Headers({foo: 'foo'});
    logger.log(`RequestOptionsInterceptX created: ${JSON.stringify(this)} `);
  }
  headers: Headers;
}
