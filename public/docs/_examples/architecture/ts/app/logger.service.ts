// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
// #docregion class
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
// #enddocregion class