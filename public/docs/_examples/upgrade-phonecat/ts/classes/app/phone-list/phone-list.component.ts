// #docregion
class PhoneListController {
  phones:any[];
  orderProp:string;
  query:string;

  static $inject = ['Phone'];
  constructor(Phone) {
    this.phones = Phone.query();
    this.orderProp = 'age';
  }

}

export default {
  templateUrl: 'phone-list/phone-list.template.html',
  controller: PhoneListController
};
