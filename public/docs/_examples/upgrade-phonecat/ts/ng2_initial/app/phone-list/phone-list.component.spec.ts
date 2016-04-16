// #docregion
import {Observable} from 'rxjs/Rx';
import './phone-list.module';
import {Phone, PhoneData} from '../core/phone/phone.service';

describe('phoneList', function() {

  // Load the module that contains the `phoneList` component before each test
  beforeEach(angular.mock.module('phoneList'));

  // Supply a hand-instantianted instance of the Phone service
  beforeEach(angular.mock.module(function($provide) {
    $provide.value('phone', new Phone(null));
  }));

  // Test the controller
  describe('PhoneListController', function() {
    var ctrl;

    beforeEach(inject(function($componentController, phone) {
      spyOn(phone, 'query').and.returnValue(Observable.of(
        [{name: 'Nexus S'}, {name: 'Motorola DROID'}]
      ));
      ctrl = $componentController('phoneList', {$scope: {}});
    }));

    it('should create a `phones` model with 2 phones fetched with `$http`', function() {
      expect(ctrl.phones).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` model', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });

});
