// #docregion
import {Phones, Phone} from '../core/phones.service';

interface PhoneRouteParams {
  phoneId: string
}

class PhoneDetailCtrl {
  phone:Phone;
  mainImageUrl:string;
  constructor($routeParams:PhoneRouteParams, phones:Phones) {
    phones.get($routeParams.phoneId)
      .subscribe(phone => {
        this.phone = phone;
        this.mainImageUrl = phone.images[0];
      });
  }
  setImage(url:string) {
    this.mainImageUrl = url;
  }
}

PhoneDetailCtrl.$inject = ['$routeParams', 'phones'];

export default PhoneDetailCtrl;
