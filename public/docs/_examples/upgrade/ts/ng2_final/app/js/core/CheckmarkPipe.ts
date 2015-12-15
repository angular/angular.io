// #docregion
import {Pipe} from 'angular2/core';

@Pipe({name: 'checkmark'})
export class CheckmarkPipe {
  transform(input:string): string {
    return input ? '\u2713' : '\u2718';
  }
}
