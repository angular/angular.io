// #docregion top
import '../../app/js/phone_detail/phone_detail.module';
// #enddocregion top

describe('PhoneDetailCtrl', function(){
  var scope, $httpBackend, ctrl,
      xyzPhoneData = function() {
        return {
          name: 'phone xyz',
          images: ['image/url1.png', 'image/url2.png']
        }
      };

  beforeEach(angular.mock.module('phonecat.detail'));

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

  beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

    $routeParams.phoneId = 'xyz';
    scope = $rootScope.$new();
    ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
  }));


  it('should fetch phone detail', function() {
    expect(ctrl.phone).toEqualData({});
    $httpBackend.flush();

    expect(ctrl.phone).toEqualData(xyzPhoneData());
  });
});
