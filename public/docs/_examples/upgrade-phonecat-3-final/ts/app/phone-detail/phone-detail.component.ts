// #docplaster
// #docregion
import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Phone, PhoneData } from '../core/phone/phone.service';
import { CheckmarkPipe } from '../core/checkmark/checkmark.pipe';

@Component({
  selector: 'phone-detail',
  templateUrl: 'phone-detail/phone-detail.template.html',
  pipes: [ CheckmarkPipe ]
})
export class PhoneDetailComponent {
  phone: PhoneData;
  mainImageUrl: string;

  constructor(routeParams: RouteParams, phone: Phone) {
    phone.get(routeParams.get('phoneId')).subscribe(phone => {
      this.phone = phone;
      this.setImage(phone.images[0]);
    });
  }

  setImage(imageUrl: string) {
    this.mainImageUrl = imageUrl;
  }
}
