// #docregion top
import '../../app/js/phone_list/phone_list.module';
// #enddocregion top

describe('PhoneListCtrl', function(){
  var scope, ctrl, $httpBackend;

  beforeEach(angular.mock.module('phonecat.list'));

  beforeEach(function(){
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {pass: angular.equals(actual, expected)};
          }
        };
      }
    });
  });

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').
        respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

    scope = $rootScope.$new();
    ctrl = $controller('PhoneListCtrl', {$scope: scope});
  }));


  it('should create "phones" model with 2 phones fetched from xhr', function() {
    expect(ctrl.phones).toEqualData([]);
    $httpBackend.flush();

    expect(ctrl.phones).toEqualData(
        [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
  });


  it('should set the default value of orderProp model', function() {
    expect(ctrl.orderProp).toBe('age');
  });
});
