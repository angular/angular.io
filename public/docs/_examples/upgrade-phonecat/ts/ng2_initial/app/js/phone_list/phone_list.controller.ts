// #docregion
import {Phones, Phone} from '../core/phones.service';

class PhoneListCtrl {
  phones:Phone[];
  orderProp:string;
  query:string;
  constructor(phones:Phones) {
    phones.query()
      .subscribe(phones => this.phones = phones);
    this.orderProp = 'age';
  }
}

PhoneListCtrl.$inject = ['phones'];

export default PhoneListCtrl;
