// #docregion
import { Injectable } from '@angular/core';
import { Connection, Request, XHRBackend } from '@angular/http';
import { Logger } from './logger.service';

@Injectable()
export class BackendInterceptService {
  constructor(
    private realBackend: XHRBackend,
    private logger: Logger) { }

  createConnection(request: Request): Connection {
    // Modify the request headers before forwarding to the "real" backend
    let headers = request.headers;
    if (headers.get('foo') == null) {
      headers.append('foo', 'foo');
    }
    this.logger.log(`MyXhrBackend request: ${JSON.stringify(request)}`);
    return this.realBackend.createConnection(request) as Connection;
  }
}
