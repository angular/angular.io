// Not yet complete
describe('Tutorial', function () {

  beforeAll(function () {
    browser.get('');
    init();
  });


  var _hrefEles, _tohDashboardHrefEle, _tohHeroesHrefEle;

  function init() {
    _hrefEles = element.all(by.css('my-app a'));

    _tohDashboardHrefEle = _hrefEles.get(0);
    _tohHeroesHrefEle = _hrefEles.get(1);

  }

  it('should be able to see the start screen', function () {
    expect(_hrefEles.count()).toEqual(2, 'should be two dashboard choices');
    expect(_tohDashboardHrefEle.getText()).toEqual("Dashboard");
    expect(_tohHeroesHrefEle.getText()).toEqual("Heroes");
  });

  it('should be able to see dashboard choices', function () {
    var dashboardHeroEles = element.all(by.css('my-app my-dashboard .module.hero'));
    expect(dashboardHeroEles.count()).toBe(4, "should be 4 dashboard hero choices");
  });

  it('should be able to toggle the views', function () {
    var dashboardEle = element(by.css('my-app my-dashboard'));
    expect(dashboardEle.element(by.css('h3')).getText()).toEqual('Top Heroes');
    _tohHeroesHrefEle.click().then(function() {
      expect(dashboardEle.isPresent()).toBe(false, 'should no longer see dashboard element');
      var heroEles = element.all(by.css('my-app my-heroes li'));
      expect(heroEles.count()).toBeGreaterThan(4, "should be more than 4 heroes shown");
      return _tohDashboardHrefEle.click();
    }).then(function() {
      expect(dashboardEle.isPresent()).toBe(true, 'should once again see the dashboard element');
    });

  });


});
