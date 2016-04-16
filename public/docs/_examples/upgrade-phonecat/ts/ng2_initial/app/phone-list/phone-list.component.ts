import {Phone, PhoneData} from '../core/phone/phone.service';

// #docregion
class PhoneListController {
  phones:PhoneData[];
  orderProp:string;
  query:string;

  static $inject = ['phone'];
  constructor(phone:Phone) {
    phone.query().subscribe(phones => {
      this.phones = phones;
    });
    this.orderProp = 'age';
  }

}

export default {
  templateUrl: 'phone-list/phone-list.template.html',
  controller: PhoneListController
};
