// #docregion
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'my-uppercase' })
export class MyUppercasePipe implements PipeTransform {
  transform(value: string) {
    return value;
  }
}
