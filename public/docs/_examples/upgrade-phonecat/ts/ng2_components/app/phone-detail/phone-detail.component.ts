// #docregion
// #docregion top
import { Component, Inject } from '@angular/core';
import { Phone, PhoneData } from '../core/phone/phone.service';
import { CheckmarkPipe } from '../core/checkmark/checkmark.pipe';

interface PhoneRouteParams {
  phoneId: string
}

@Component({
  selector: 'phone-detail',
  templateUrl: 'phone-detail/phone-detail.template.html',
  pipes: [CheckmarkPipe]
})
// #enddocregion top
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
