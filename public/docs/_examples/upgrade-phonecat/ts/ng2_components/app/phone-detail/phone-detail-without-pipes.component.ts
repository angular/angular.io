// #docregion
import { Component, Inject } from '@angular/core';
import {Phone, PhoneData} from '../core/phone/phone.service';

interface PhoneRouteParams {
  phoneId: string
}

@Component({
  selector: 'phone-detail',
  templateUrl: 'phone-detail/phone-detail.html'
})
export default class PhoneDetail {
  phone:PhoneData;
  mainImageUrl:string;

  constructor(@Inject('$routeParams') $routeParams:PhoneRouteParams,
              phone:Phone) {
    phone.get($routeParams.phoneId)
      .subscribe(phone => {
        this.phone = phone;
        this.setImage(phone.images[0]);
      });
  }

  setImage(url:string) {
    this.mainImageUrl = url;
  }

}
