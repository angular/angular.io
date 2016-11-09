import { browser, element, by } from 'protractor';

export var appLang = {
  appIsTs: false,
  appIsJs: false,
  appIsDart: false,
  appIsUnknown: false
};

export function describeIf(cond: boolean, name: string, func: () => void): void {
  if (cond) {
    describe(name, func);
  } else {
    xdescribe(name, func);
  }
}

export function itIf(cond: boolean, name: string, func: (done: DoneFn) => void): void {
  if (cond) {
    it(name, func);
  } else {
    xit(name, func);
  }
}

export function setProtractorToNg1Mode(): void {
  browser.rootEl = 'body';
}

// Protractor doesn't support the UpgradeAdapter's asynchronous
// bootstrap with Angular 1 at the moment. Get around it by
// waiting for an element to get `ng-scope` class.
export function waitForNg1AsyncBootstrap() {
  browser.ng12Hybrid = true;
  browser.driver.wait(function() {
    return element(by.css('.ng-scope')).isPresent();
  }, 5000);
  // Use this instead when upgrading to protractor > 4.0.10
  // browser.ng12Hybrid = true;
}
