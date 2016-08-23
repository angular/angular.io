// #docregion
// #docregion depends-on-angular
import { Pipe, PipeTransform } from '@angular/core';
// #enddocregion depends-on-angular

@Pipe({ name: 'my-uppercase' })
export class MyUppercasePipe implements PipeTransform {
  // #docregion uppercase
  transform(value: string) {
    return value.toUpperCase();
  }
  // #enddocregion uppercase
}
