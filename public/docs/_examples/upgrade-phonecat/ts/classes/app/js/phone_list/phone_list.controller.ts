// #docregion
class PhoneListCtrl {
  phones:any[];
  orderProp:string;
  query:string;
  constructor(Phone) {
    this.phones = Phone.query();
    this.orderProp = 'age';
  }
}

PhoneListCtrl.$inject = ['Phone'];

export default PhoneListCtrl;
