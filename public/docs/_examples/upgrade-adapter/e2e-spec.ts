/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Upgrade Tests', function () {

  // Protractor doesn't support the UpgradeAdapter's asynchronous
  // bootstrap with Angular 1 at the moment. Get around it by
  // waiting for an element to get `ng-scope` class.
  function waitForNg1AsyncBootstrap() {
    browser.ignoreSynchronization = true;
    browser.driver.wait(function() {
      return element(by.css('.ng-scope')).isPresent();
    }, 5000);
  }

  describe('NG1 Auto-bootstrap', function() {

    beforeAll(function () {
      browser.get('/index-ng-app.html');
      setProtractorToNg1Mode();
    });

    it('bootstraps as expected', function () {
      expect(element(by.css('#message')).getText()).toEqual('Hello world');
    });

  });

  describe('NG1 JavaScript Bootstrap', function() {

    beforeAll(function () {
      browser.get('/index-bootstrap.html');
      setProtractorToNg1Mode();
    });

    it('bootstraps as expected', function () {
      expect(element(by.css('#message')).getText()).toEqual('Hello world');
    });

  });

  describe('NG1-2 Hybrid Bootstrap', function() {

    beforeAll(function () {
      browser.get('/index-1-2-hybrid-bootstrap.html');
      setProtractorToNg1Mode();
    });

    it('bootstraps as expected', function () {
      expect(element(by.css('#message')).getText()).toEqual('Hello world');
    });

  });

  describe('NG1-2 Hybrid Bootstrap with Shared UpgradeAdapter', function() {

    beforeAll(function () {
      browser.get('/index-1-2-hybrid-shared-adapter-bootstrap.html');
      setProtractorToNg1Mode();
    });

    it('bootstraps as expected', function () {
      expect(element(by.css('#message')).getText()).toEqual('Hello world');
    });

  });

  describe('Upgraded static component', function() {

    beforeAll(function () {
      browser.get('/index-upgrade-static.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('renders', function () {
      expect(element(by.css('h2')).getText()).toEqual('Windstorm details!');
    });

  });


  describe('Upgraded component with IO', function() {

    beforeAll(function () {
      browser.get('/index-upgrade-io.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('has inputs', function () {
      expect(element(by.css('h2')).getText()).toEqual('Windstorm details!');
    });

    it('has outputs', function () {
      element(by.buttonText('Delete')).click();
      expect(element(by.css('h2')).getText()).toEqual('Ex-Windstorm details!');
    });

  });


  describe('Downgraded static component', function() {

    beforeAll(function () {
      browser.get('/index-downgrade-static.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('renders', function () {
      expect(element(by.css('h2')).getText()).toEqual('Windstorm details!');
    });

  });

  describe('Downgraded component with IO', function() {

    beforeAll(function () {
      browser.get('/index-downgrade-io.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('has inputs', function () {
      expect(element.all(by.css('h2')).first().getText()).toEqual('Windstorm details!');
    });

    it('has outputs', function () {
      element.all(by.buttonText('Delete')).first().click();
      expect(element.all(by.css('h2')).first().getText()).toEqual('Ex-Windstorm details!');
    });

    it('supports ng-repeat', function () {
      expect(element.all(by.css('hero-detail')).count()).toBe(3);
    });

  });


  describe('Downgraded component with content projection', function() {

    beforeAll(function () {
      browser.get('/index-1-to-2-projection.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('can be transcluded into', function () {
      expect(element(by.css('hero-detail')).getText()).toContain('Specific powers of controlling winds');
    });

  });


  describe('Upgraded component with transclusion', function() {

    beforeAll(function () {
      browser.get('/index-2-to-1-transclusion.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('can be projected into', function () {
      expect(element(by.css('hero-detail')).getText()).toContain('Specific powers of controlling winds');
    });

  });


  describe('Upgrading NG1 Providers', function() {

    beforeAll(function () {
      browser.get('/index-1-to-2-providers.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('works', function () {
      expect(element(by.css('h2')).getText()).toBe('1: Windstorm');
    });

  });


  describe('Downgrading NG2 Providers', function() {

    beforeAll(function () {
      browser.get('/index-2-to-1-providers.html');
      setProtractorToNg1Mode();
      waitForNg1AsyncBootstrap();
    });

    it('works', function () {
      expect(element(by.css('h2')).getText()).toBe('1: Windstorm');
    });

  });

});
