// #docregion
import {Phone, PhoneData} from '../core/phone/phone.service';

interface PhoneRouteParams {
  phoneId: string
}

class PhoneDetailController {
  phone:PhoneData;
  mainImageUrl:string;

  static $inject = ['$routeParams', 'phone'];
  constructor($routeParams:PhoneRouteParams, phone:Phone) {
    phone.get($routeParams.phoneId).subscribe(phone => {
      this.phone = phone;
      this.setImage(phone.images[0]);
    });
  }

  setImage(imageUrl) {
    this.mainImageUrl = imageUrl;
  }

}

export default {
  templateUrl: 'phone-detail/phone-detail.template.html',
  controller: PhoneDetailController
};
