// #docregion full
// #docregion top
import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Observable} from 'rxjs';
import {Phones, Phone} from '../core/Phones';
import PhoneFilterPipe from './PhoneFilterPipe';
import OrderByPipe from './OrderByPipe';

@Component({
  selector: 'pc-phone-list',
  templateUrl: 'js/phone_list/phone_list.html',
  pipes: [PhoneFilterPipe, OrderByPipe],
  directives: [RouterLink]
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
