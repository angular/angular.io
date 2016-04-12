describe('Router Cookbook Tests', function () {


  beforeAll(function () {
    browser.get('');
  });

  describe('Subscribing to the router', function() {
    // #docregion router-subscription
    // ...

    it('should listen for URL updates', function () {
      var headers = element.all(by.className('header'));

      expect(headers.first().getText()).toContain('/home');
    });
    // ...
    // #enddocregion router-subscription
  });

  describe('Navigating without updating the URL', function() {
    // #docregion silent-navigation
    // ...

    it('should update the view without updating the URL', function () {
      var links = element.all(by.tagName('a'));
      links.last().click();

      var headers = element.all(by.className('header'));
      expect(headers.first().getText()).toContain('/restricted');
      expect(headers.last().getText()).toContain('/unauthorized');
    });
    // ...
    // #enddocregion silent-navigation
  });

  describe('After navigation', function() {
    // #docregion page-title
    // ...

    it('should update the browser page title', function () {
      var pageTitle = browser.getTitle().then(function(title) {
        expect(title).toBe('Home');
      });
    });
    // ...
    // #enddocregion page-title
  });
});
