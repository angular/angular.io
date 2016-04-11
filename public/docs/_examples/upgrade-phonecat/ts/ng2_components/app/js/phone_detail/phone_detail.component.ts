// #docregion
// #docregion top
import {Component, Inject} from 'angular2/core';
import {Phones, Phone} from '../core/phones.service';
import {CheckmarkPipe} from '../core/checkmark.pipe';

interface PhoneRouteParams {
  phoneId: string
}

@Component({
  selector: 'pc-phone-detail',
  templateUrl: 'js/phone_detail/phone_detail.html',
  pipes: [CheckmarkPipe]
})
class PhoneDetail {
// #enddocregion top
  phone:Phone = undefined;
  mainImageUrl:string;
  constructor(@Inject('$routeParams') $routeParams:PhoneRouteParams,
              phones:Phones) {
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
export default PhoneDetail;
