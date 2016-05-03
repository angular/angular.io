// #docregion full
// #docregion top
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {Phones, Phone} from '../core/phones.service';
import PhoneFilterPipe from './phone_filter.pipe';
import OrderByPipe from './order_by.pipe';

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
