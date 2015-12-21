
describe('Forms Tests', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should display correct title', function () {
    expect(element.all(by.css('h1')).get(0).getText()).toEqual('Hero Form');
  });


  it('should not display message before submit', function () {
    var ele = element(by.css('h2'));
    // expect(ele.isPresent()).toBeFalsy();
    expect(ele.isDisplayed()).toBeFalsy();
  });

  it('should hide form after submit', function () {
    var ele = element.all(by.css('h1')).get(0);
    expect(ele.isDisplayed()).toBeTruthy();
    var b = element.all(by.css('button[type=submit]')).get(0);
    b.click().then(function() {
      expect(ele.isDisplayed()).toBeFalsy();
    });
  });

  it('should display message after submit', function () {
    var b = element.all(by.css('button[type=submit]')).get(0);
    b.click().then(function() {
      expect(element(by.css('h2')).getText()).toContain('You submitted the following');
    });
  });

  it('should reflect submitted data after submit', function () {
    var test = 'testing 1 2 3';
    // var nameEle = element(by.name('name'));
    var nameEle = element.all(by.css('input[ngcontrol=name]')).get(0);
    nameEle.getAttribute('value').then(function(value) {
      nameEle.sendKeys(test);
      expect(nameEle.getAttribute('value')).toEqual(value + test);
    }).then(function() {
      var b = element.all(by.css('button[type=submit]')).get(0);
      return b.click();
    }).then(function() {
      expect(element(by.css('h2')).getText()).toContain('You submitted the following');
    });
  });
});
