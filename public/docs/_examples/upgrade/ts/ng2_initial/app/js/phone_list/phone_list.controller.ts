// #docregion
import {Phones, Phone} from '../core/Phones';

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
