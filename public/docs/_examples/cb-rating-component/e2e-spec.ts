/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Rating component', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should show 5 stars for windstorm', function () {
    const windstormRating = element.all(by.tagName('my-hero-rating')).get(0);
    const windstormStars = windstormRating.all(by.css('.glyphicon-star'));
    expect(windstormStars.count()).toBe(5);
  });

  it('should show 1 star for bombasto', function() {
    const bombastoRating = element.all(by.tagName('my-hero-rating')).get(1);
    const bombastoStars = bombastoRating.all(by.css('.glyphicon-star'));
    expect(bombastoStars.count()).toBe(1);
  });

  it('should change the rate on click', function() {
    const bombastoRating = element.all(by.tagName('my-hero-rating')).get(1);
    const bombastoFourthStar = bombastoRating.all(by.css('.glyphicon')).get(3);
    bombastoFourthStar.click().then(function() {
      const bombastoStars = bombastoRating.all(by.css('.glyphicon-star'));
      expect(bombastoStars.count()).toBe(4);

      const div = element.all(by.tagName('div')).get(0);
      expect(div.getText()).toEqual('Bombasto rate is 4');
    });
  });
});
