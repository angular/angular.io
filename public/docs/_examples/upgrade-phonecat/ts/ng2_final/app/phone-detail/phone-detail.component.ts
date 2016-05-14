// #docregion
// #docregion top
import {Component, Inject} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Phone, PhoneData} from '../core/phone/phone.service';
import {CheckmarkPipe} from '../core/checkmark/checkmark.pipe';

@Component({
  selector: 'phone-detail',
  templateUrl: 'phone-detail/phone-detail.template.html',
  pipes: [CheckmarkPipe]
})
// #enddocregion top
export default class PhoneDetail {
  phone:PhoneData = undefined;
  mainImageUrl:string;

  constructor(routeParams:RouteParams,
              phone:Phone) {
    phone.get(routeParams.get('phoneId'))
      .subscribe(phone => {
        this.phone = phone;
        this.setImage(phone.images[0]);
      });
  }

  setImage(url:string) {
    this.mainImageUrl = url;
  }

}
