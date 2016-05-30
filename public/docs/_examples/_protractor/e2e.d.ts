/// <reference path="typings/index.d.ts" />

// Defined in protractor.config.js
declare function setProtractorToNg1Mode(): void;
declare function sendKeys(element: protractor.ElementFinder, str: string): webdriver.promise.Promise<void>;
declare function describeIf(cond: boolean, name: string, func: Function): void;
declare function itIf(cond: boolean, name: string, func: Function): void;

declare namespace protractor {
  interface IBrowser {
    appIsTs: boolean;
    appIsJs: boolean;
  }
}
