/// <reference path='../_protractor/e2e.d.ts' />
/**
 * The tests here basically just checking that the end styles
 * of each animation are in effect.
 *
 * Relies on the Angular 2 testability only becoming stable once
 * animation(s) have finished.
 *
 * Ideally we'd use https://developer.mozilla.org/en-US/docs/Web/API/Document/getAnimations
 * but they're not supported in Chrome at the moment. The upcoming nganimate polyfill
 * may also add some introspection support.
 */
describe('Animation Tests', () => {

  const INACTIVE_COLOR = 'rgba(238, 238, 238, 1)';
  const ACTIVE_COLOR = 'rgba(207, 216, 220, 1)';
  const NO_TRANSFORM_MATRIX_REGEX = /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)/;

  beforeEach(() => {
    browser.get('');
  });

  describe('basic states', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-basic'));
    });

    it('animates between active and inactive', () => {
      addHero();

      let li = host.element(by.css('li'));

      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.1);
      expect(li.getCssValue('backgroundColor')).toBe(ACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);
    });

  });

  describe('styles inline in transitions', () => {

    var host: protractor.ElementFinder;

    beforeEach(function() {
      host = element(by.css('hero-list-inline-styles'));
    });

    it('are not kept after animation', () => {
      addHero();

      var li = host.element(by.css('li'));

      li.click();
      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);
    });

  });

  describe('combined transition syntax', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-combined-transitions'));
    });

    it('animates between active and inactive', () => {
      addHero();

      let li = host.element(by.css('li'));

      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.1);
      expect(li.getCssValue('backgroundColor')).toBe(ACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);
    });

  });

  describe('two-way transition syntax', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-twoway'));
    });

    it('animates between active and inactive', () => {
      addHero();

      let li = host.element(by.css('li'));

      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.1);
      expect(li.getCssValue('backgroundColor')).toBe(ACTIVE_COLOR);

      li.click();
      expect(getScaleX(li)).toBe(1.0);
      expect(li.getCssValue('backgroundColor')).toBe(INACTIVE_COLOR);
    });

  });

  describe('enter & leave', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-enter-leave'));
    });

    it('adds and removes element', () => {
      addHero();

      let li = host.element(by.css('li'));
      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  describe('enter & leave & states', () => {

    let host: protractor.ElementFinder;

    beforeEach(function() {
      host = element(by.css('hero-list-enter-leave-states'));
    });

    it('adds and removes and animates between active and inactive', () => {
      addHero();

      let li = host.element(by.css('li'));

      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);

      li.click();
      expect(getScaleX(li)).toBe(1.1);

      li.click();
      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  describe('auto style calc', () => {

    let host: protractor.ElementFinder;

    beforeEach(function() {
      host = element(by.css('hero-list-auto'));
    });

    it('adds and removes element', () => {
      addHero();

      let li = host.element(by.css('li'));
      expect(li.getCssValue('height')).toBe('50px');

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  describe('different timings', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-timings'));
    });

    it('adds and removes element', () => {
      addHero();

      let li = host.element(by.css('li'));
      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);
      expect(li.getCssValue('opacity')).toMatch('1');

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  describe('multiple keyframes', () => {

    let host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-multistep'));
    });

    it('adds and removes element', () => {
      addHero();

      let li = host.element(by.css('li'));
      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);
      expect(li.getCssValue('opacity')).toMatch('1');

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  describe('parallel groups', () => {

    var host: protractor.ElementFinder;

    beforeEach(() => {
      host = element(by.css('hero-list-groups'));
    });

    it('adds and removes element', () => {
      addHero();

      let li = host.element(by.css('li'));
      expect(li.getCssValue('transform')).toMatch(NO_TRANSFORM_MATRIX_REGEX);
      expect(li.getCssValue('opacity')).toMatch('1');

      removeHero();
      expect(li.isPresent()).toBe(false);
    });

  });

  function addHero() {
    element(by.buttonText('Add hero')).click();
  }

  function removeHero() {
    element(by.buttonText('Remove hero')).click();
  }

  function getScaleX(el: protractor.ElementFinder) {
    return protractor.promise.all([
      getBoundingClientWidth(el),
      getOffsetWidth(el)
    ]).then(function([clientWidth, offsetWidth]) {
      return clientWidth / offsetWidth;
    });
  }

  function getBoundingClientWidth(el: protractor.ElementFinder): protractor.promise.Promise<number> {
    return browser.executeScript(
      'return arguments[0].getBoundingClientRect().width',
      el.getWebElement()
    );
  }

  function getOffsetWidth(el: protractor.ElementFinder): protractor.promise.Promise<number> {
    return browser.executeScript(
      'return arguments[0].offsetWidth',
      el.getWebElement()
    );
  }

});
