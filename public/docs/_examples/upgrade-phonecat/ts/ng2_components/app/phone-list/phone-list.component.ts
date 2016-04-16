// #docregion
// #docregion top
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Phone, PhoneData} from '../core/phone/phone.service';
import PhoneFilterPipe from './phone-filter.pipe';
import OrderByPipe from './order-by.pipe';

@Component({
  selector: 'phone-list',
  templateUrl: 'phone-list/phone-list.template.html',
  pipes: [PhoneFilterPipe, OrderByPipe]
})
// #enddocregion top
export default class PhoneList {
  phones:Observable<PhoneData[]>;
  orderProp:string;
  query:string;

  constructor(phone:Phone) {
    this.phones = phone.query();
    this.orderProp = 'age';
  }

}
