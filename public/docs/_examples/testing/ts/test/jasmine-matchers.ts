////  Jasmine Custom Matchers ////
declare module jasmine {
  interface Matchers {
    /**
     *  Custom Jasmine matcher for array length
     *
     *  @example
     *    let a = [1, 2, 3];
     *    expect(a).toHaveLength(3);
     */
    toHaveLength(expected: number, expectationFailOutput?: any): void;
    /**
     *  Custom Jasmine Matcher for ComponentFixture or DebugElement
     *
     *  @example
     *    // same as expect(fixture.nativeElement.textContent).toContain('foo');
     *    expect(fixture).toHaveText('foo');
     */
    toHaveText(expected: string, expectationFailOutput?: any): void;
  }
}


function toHaveLength(
    util: jasmine.MatchersUtil, customEqualityTesters:
    Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher {

  return {
    compare: function (actual: any[], expected: number, expectationFailOutput?: any): jasmine.CustomMatcherResult {
      let message = '';
      let pass = Array.isArray(actual);
      if (!pass) {
        message = 'Expected actual to be an array.';
      } else {
        pass = actual.length === expected;
        message = pass ? '' : `Expected actual array length to be ${expected}.`;
      }
      if (!pass && expectationFailOutput) { message += ` '${expectationFailOutput}'` ; }
      return { pass, message };
    }
  };
}

function toHaveText(
    util: jasmine.MatchersUtil, customEqualityTesters:
    Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher {

  return {
    compare: function (actual: any, expected: string, expectationFailOutput?: any): jasmine.CustomMatcherResult {
      let message = '';
      let nativeElement = actual['nativeElement'];
      // tslint:disable-next-line:triple-equals
      let pass = nativeElement != undefined;
      if (!pass) {
        message = 'Expected actual to be a native HTMLElement.';
      } else {
        let text: string = nativeElement.textContent;
        pass = text.indexOf(expected) > -1;
        if (!pass) {
          if (text.length > 100) { text = text.substr(0, 100) + '...'; }
          message =  `Expected element to have text content '${expected}' instead of '${text}'.`;
        }
      }
      if (!pass && expectationFailOutput) { message += ` '${expectationFailOutput}'` ; }
      return { pass, message };
    }
  };
}

let customMatchers: jasmine.CustomMatcherFactories = {
  toHaveLength: toHaveLength,
  toHaveText: toHaveText
};

beforeEach(function () {
  jasmine.addMatchers(customMatchers);
});


