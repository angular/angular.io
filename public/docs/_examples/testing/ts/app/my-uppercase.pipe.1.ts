// #docregion
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'my-uppercase' })
export class MyUppercasePipe implements PipeTransform {
  transform(value: string) {
    return value;
  }
}
