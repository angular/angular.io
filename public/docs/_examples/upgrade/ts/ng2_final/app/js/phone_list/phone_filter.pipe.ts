// #docregion
import {Pipe} from 'angular2/core';
import {Phone} from '../core/phones.service';

@Pipe({name: 'phoneFilter'})
export default class PhoneFilterPipe {

  transform(input:Phone[], args:string[]): Phone[] {
    let query = args[0];
    if (query) {
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
