'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/phones');
      });
  });


  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones');
    });

    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.css('.phones li'));
      var query = element(by.css('input'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      // https://github.com/angular/protractor/issues/2019
      var str = 'motorola';
      for (var i = 0; i < str.length; i++) {
        query.sendKeys(str.charAt(i));
      }

      expect(phoneList.count()).toBe(8);
    });


    it('should be possible to control phone order via the drop down select box', function() {
      var phoneNameColumn = element.all(by.css('.phones .name'));
      var query = element(by.css('input'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      //let's narrow the dataset to make the test assertions shorter
      // https://github.com/angular/protractor/issues/2019
      var str = 'tablet';
      for (var i = 0; i < str.length; i++) {
        query.sendKeys(str.charAt(i));
      }

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.css('select')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });


    it('should render phone specific links', function() {
      var query = element(by.css('input'));
      // https://github.com/angular/protractor/issues/2019
      var str = 'nexus';
      for (var i = 0; i < str.length; i++) {
        query.sendKeys(str.charAt(i));
      }
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/phones/nexus-s');
      });
    });
  });


  describe('Phone detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.css('h1')).getText()).toBe('Nexus S');
    });


    it('should display the first phone image as the main phone image', function() {
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.phone-thumbs li:nth-of-type(3) img')).click();
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      element(by.css('.phone-thumbs li:nth-of-type(1) img')).click();
      expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });
  });
});
