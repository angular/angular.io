// #docregion top
import {Component, Observable} from 'angular2/angular2';
import {Phones, Phone} from '../core/Phones';

@Component({
  selector: 'pc-phone-list',
  templateUrl: 'app/phone_list/phone_list.html'
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
