// #docregion top
import {Component} from 'angular2/core';
import {Observable} from 'rxjs';
import {Phones, Phone} from '../core/phones.service';

@Component({
  selector: 'pc-phone-list',
  templateUrl: 'js/phone_list/phone_list.html'
})
class PhoneList {
// #enddocregion top

  phones:Observable<Phone[]>;
  orderProp:string;
  query:string;
  constructor(phones:Phones) {
    this.phones = phones.query();
    this.orderProp = 'age';
  }
}

export default PhoneList;
