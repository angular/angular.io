// #docregion
// #docregion depends-on-angular
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'initCaps' })
export class InitCapsPipe implements PipeTransform {
  // #enddocregion depends-on-angular
  transform(value: string) {
    return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
      return m.toUpperCase();
    });
  }
  // #docregion depends-on-angular
}
// #enddocregion depends-on-angular
