// #docregion
interface PhoneRouteParams {
  phoneId: string
}

class PhoneDetailCtrl {
  phone:any;
  mainImageUrl:string;
  constructor($routeParams:PhoneRouteParams, Phone) {
    this.phone = Phone.get({phoneId: $routeParams.phoneId}, (phone) =>
      this.mainImageUrl = phone.images[0]
    );
  }

  setImage(url:string) {
    this.mainImageUrl = url;
  }
}

PhoneDetailCtrl.$inject = ['$routeParams', 'Phone'];

export default PhoneDetailCtrl;
