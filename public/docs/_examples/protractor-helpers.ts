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

// TODO Jesus - figure out what's needed here for the new upgrade chapters
// Allow changing bootstrap mode to NG1 for upgrade tests
export function setProtractorToNg1Mode(): void {
  browser.rootEl = 'body';
  // let disableNgAnimate = function() {
  //   angular.module('disableNgAnimate', []).run(['$animate', function($animate: any) {
  //     $animate.enabled(false);
  //   }]);
  // };

  // browser.addMockModule('disableNgAnimate', disableNgAnimate);
}

// Protractor doesn't support the UpgradeAdapter's asynchronous
// bootstrap with Angular 1 at the moment. Get around it by
// waiting for an element to get `ng-scope` class.
export function waitForNg1AsyncBootstrap() {
  browser.ignoreSynchronization = true;
  browser.driver.wait(function() {
    return element(by.css('.ng-scope')).isPresent();
  }, 5000);
}
