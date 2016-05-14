// #docregion
interface PhoneRouteParams {
  phoneId: string
}

class PhoneDetailController {
  phone:any;
  mainImageUrl:string;

  static $inject = ['$routeParams', 'Phone'];
  constructor($routeParams:PhoneRouteParams, Phone) {
    this.phone = Phone.get({phoneId: $routeParams.phoneId}, phone => {
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
