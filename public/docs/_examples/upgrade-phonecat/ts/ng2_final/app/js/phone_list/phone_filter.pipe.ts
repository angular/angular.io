// #docregion
import {Pipe} from '@angular/core';
import {Phone} from '../core/phones.service';

@Pipe({name: 'phoneFilter'})
export default class PhoneFilterPipe {

  transform(input:Phone[], query:string = ''): Phone[] {
    if (input) {
      query = query.toLowerCase();
      return input.filter((phone) => {
        const name = phone.name.toLowerCase();
        const snippet = phone.snippet.toLowerCase();
        return name.indexOf(query) >= 0 || snippet.indexOf(query) >= 0;
      });
    } else {
      return input;
    }
  }

}
