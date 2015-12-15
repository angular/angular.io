// #docregion
import {Pipe} from 'angular2/core';

@Pipe({name: 'orderBy'})
export default class OrderByPipe {

  transform<T>(input:T[], args:string[]): T[] {
    if (input) {
      let property = args[0];
      return input.slice().sort((a, b) => {
        if (a[property] < b[property]) {
          return -1;
        } else if (b[property] < a[property]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return input;
    }
  }

}
