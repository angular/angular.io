import {Injectable, Pipe} from 'angular2/core';
import {DatePipe} from 'angular2/common';

@Injectable()
// #docregion date-pipe
@Pipe({name: 'date', pure: true})
export class StringSafeDatePipe extends DatePipe {
 transform(value: any, args: any[]): string {
   value = typeof value === 'string' ?
           Date.parse(value) : value
   return super.transform(value, args);
 }
}
// #enddocregion date-pipe
