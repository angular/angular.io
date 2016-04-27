// #docregion
import {Pipe} from '@angular/core';

@Pipe({name: 'orderBy'})
export default class OrderByPipe {

  transform<T>(input:T[], property:string): T[] {
    if (input) {
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
