'use strict'; // necessary for es6 output in node

import { browser, element, by, ExpectedConditions as EC } from 'protractor';

describe('Change Detection guide', () => {

  beforeEach(() => {

    // setInterval() used in the code makes Protractor mistakenly think we're not
    // finished loading unless we turn this on.
    browser.ignoreSynchronization = true;

    browser.get('/');
    return browser.wait(EC.presenceOf(element(by.css('[ng-version]'))));
  });

  describe('Basic Example', () => {

    it('displays a counter that can be incremented and decremented', () => {
      const component = element(by.tagName('hero-counter'));
      const counter = component.element(by.css('span'));

      expect(counter.getText()).toEqual('5');

      component.element(by.buttonText('+')).click();
      expect(counter.getText()).toEqual('6');
      component.element(by.buttonText('-')).click();
      expect(counter.getText()).toEqual('5');
    });

  });

  describe('Broken name badge example', () => {

    it('causes an error', () => {
      const errorDump = element(by.id('bootstrapError'));
      expect(errorDump.getText()).toContain('HeroNameBadgeBrokenComponent');
      expect(errorDump.getText()).toContain('Expression has changed after it was checked');
    });

    it('still displays the bound data', () => {
      const component = element(by.tagName('hero-name-badge-broken'));
      expect(component.element(by.css('h4')).getText()).toEqual('Anonymous details');
    });

  });

  describe('Fixed name badge example', () => {

    it('displays the bound data', () => {
      const component = element(by.tagName('hero-name-badge'));
      expect(component.element(by.css('h4')).getText()).toEqual('details');
      expect(component.element(by.css('p')).getText()).toEqual('Name: Anonymous');
    });

  });

  describe('OnPush', () => {

    describe('with immutable string inputs', () => {

      it('displays the bound data', () => {
        const component = element(by.tagName('hero-search-result'));
        const match = component.element(by.css('.match'));
        expect(match.getText()).toEqual('indsto');
      });

    });

    describe('with input mutations', () => {

      it('does not display the mutations', () => {
        const component = element(by.tagName('hero-manager-mutable'));

        expect(component.element(by.cssContainingText('li', 'Windstorm')).isPresent()).toBe(true);
        expect(component.element(by.cssContainingText('li', 'Magneta')).isPresent()).toBe(true);
        component.element(by.buttonText('Add one more')).click();
        expect(component.element(by.cssContainingText('li', 'Bombasto')).isPresent()).toBe(false);

      });

    });

    describe('with immutable array input', () => {

      it('displays the changes', () => {
        const component = element(by.tagName('hero-manager-immutable'));

        expect(component.element(by.cssContainingText('li', 'Windstorm')).isPresent()).toBe(true);
        expect(component.element(by.cssContainingText('li', 'Magneta')).isPresent()).toBe(true);
        component.element(by.buttonText('Add one more')).click();
        expect(component.element(by.cssContainingText('li', 'Bombasto')).isPresent()).toBe(true);

      });

    });

    describe('with events', () => {

      it('displays the changes', () => {
        const component = element(by.tagName('hero-counter-onpush'));
        const counter = component.element(by.css('span'));

        expect(counter.getText()).toEqual('5');

        component.element(by.buttonText('+')).click();
        expect(counter.getText()).toEqual('6');
        component.element(by.buttonText('-')).click();
        expect(counter.getText()).toEqual('5');
      });

    });

    describe('with explicit markForDetection()', () => {

      it('does not detect setInterval() when not used', () => {
        const component = element(by.tagName('hero-counter-auto-broken'));
        browser.sleep(300); // There's an interval of 100ms inside the component.
        expect(component.getText()).toEqual('Number of heroes: 5');
      });

      it('does detect setInterval() when used', () => {
        const component = element(by.tagName('hero-counter-auto'));
        browser.sleep(300); // There's an interval of 100ms inside the component.
        expect(component.getText()).not.toEqual('Number of heroes: 5');
        expect(component.getText()).toMatch(/Number of heroes: \d+/);
      });

      it('detects on evented library callbacks', () => {
        const component = element(by.tagName('hero-name-badge-evented'));
        expect(component.element(by.cssContainingText('h4', 'Windstorm details')).isPresent()).toBe(true);
        element(by.buttonText('Rename')).click();
        expect(component.element(by.cssContainingText('h4', 'Magneta details')).isPresent()).toBe(true);
      });

    });

    describe('detached', () => {

      it('does not pick up changes automatically', () => {
        const component = element(by.tagName('hero-name-badge-detached'));
        expect(component.element(by.css('h4')).getText()).toEqual('Windstorm details');
        element(by.buttonText('Rename detached')).click();
        expect(component.element(by.css('h4')).getText()).toEqual('Windstorm details');
      });

      it('starts picking up changes again when reattached', () => {
        const component = element(by.tagName('hero-counter-live'));
        const count = component.element(by.css('.count'));

        const text1 = count.getText();
        browser.sleep(100);
        component.element(by.buttonText('Toggle live update')).click();
        const text2 = count.getText();
        browser.sleep(100);
        const text3 = count.getText();

        expect(text1).not.toEqual(text2);
        expect(text2).toEqual(text3);
      });

      it('can be used for throttling by explicitly detecting with an interval', () => {
        const component = element(by.tagName('hero-counter-throttled'));
        const count = component.element(by.css('.count'));

        const text1 = count.getText();
        browser.sleep(100);
        const text2 = count.getText();
        browser.sleep(100);
        const text3 = count.getText();

        Promise.all([text1, text2, text3]).then(([t1, t2, t3]) => {
          let differences = 0;
          if (t1 !== t2) {
            differences++;
          }
          if (t2 !== t3) {
            differences++;
          }
          expect(differences).toBeLessThan(2);
        });
      });

    });




  });

});
