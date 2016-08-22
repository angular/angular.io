import {FunctionWithParamTokens, injectAsync,RootTestComponent, TestComponentBuilder} from 'angular2/testing';
import {By} from 'angular2/angular2'

///////// Should be in testing  /////////

export type DoneFn = {
  fail: (err?:any) => void,
  (done?:any): () => void
}

///////// injectAsync extensions ///

type PromiseLikeTestFn = (...args:any[]) => PromiseLike<any>;
type PromiseLikeTcbTestFn = (tcb: TestComponentBuilder, ...args:any[]) => PromiseLike<any>;

/** Run an async component test within Angular test bed using TestComponentBuilder
// Example
//    it('async Component test', tcb => {
//      // your test here
//      // your test here
//      // your test here
//      return aPromise;
//    });
//
// May precede the test fn with some injectables which will be passed as args AFTER the TestComponentBuilder
// Example:
//    it('async Component test w/ injectables', [HeroService], (tcb, service:HeroService) => {
//      // your test here
//      return aPromise;
//    });
*/
export function injectTcb(testFn: (tcb: TestComponentBuilder) => PromiseLike<any>): FunctionWithParamTokens;
export function injectTcb(dependencies: any[], testFn: PromiseLikeTcbTestFn): FunctionWithParamTokens;
export function injectTcb(dependencies: any[] | PromiseLikeTcbTestFn, testFn?: PromiseLikeTcbTestFn) {

  if (typeof dependencies === 'function' ){
    testFn = <PromiseLikeTcbTestFn>dependencies;
    dependencies = [];
  }

  return injectAsync([TestComponentBuilder, ...(<any[]>dependencies)], testFn);
}
///////// inspectors and expectations /////////

export function getSelectedHtml(rootTC: RootTestComponent, selector: string) {
  var debugElement = rootTC.debugElement.query(By.css(selector));
  return debugElement && debugElement.nativeElement && debugElement.nativeElement.innerHTML;
}

export function expectSelectedHtml(rootTC: RootTestComponent, selector: string) {
  return expect(getSelectedHtml(rootTC, selector));
}

export function getSelectedClassName(rootTC: RootTestComponent, selector: string) {
  var debugElement = rootTC.debugElement.query(By.css(selector));
  return debugElement && debugElement.nativeElement && debugElement.nativeElement.className;
}

export function expectSelectedClassName(rootTC: RootTestComponent, selector: string) {
  return expect(getSelectedClassName(rootTC, selector));
}

export function getViewChildHtml(rootTC: RootTestComponent, elIndex: number = 0) {
  let child = rootTC.debugElement.componentViewChildren[elIndex];
  return child && child.nativeElement && child.nativeElement.innerHTML
}

export function expectViewChildHtml(rootTC: RootTestComponent, elIndex: number = 0) {
  return expect(getViewChildHtml(rootTC, elIndex));
}

export function expectViewChildClass(rootTC: RootTestComponent, elIndex: number = 0) {
  let child = rootTC.debugElement.componentViewChildren[elIndex];
  return expect(child && child.nativeElement && child.nativeElement.className);
}

export function dispatchEvent(element: Element, eventType: string) {
  element.dispatchEvent(new Event(eventType));
}

/** Let time pass so that DOM or Ng can react
// returns a promise that returns ("passes through")
// the value resolved in the previous `then` (if any)
// after delaying for [millis] which is zero by default.
// Example (passing along the rootTC w/ no delay):
//     ...
//     return rootTC;  // optional
//   })
//   .then(tick)
//   .then(rootTC:RTC => { .. do something ..});
//
// Example (passing along nothing in particular w/ 10ms delay):
//     ...
//     // don't care if it returns something or not
//   })
//   .then(_ => tick(_, 10)) // ten milliseconds pass
//   .then(() => { .. do something ..});
*/
export function tick(passThru?: any, millis: number = 0){
  return new Promise((resolve, reject) =>{
    setTimeout(() => resolve(passThru), millis);
  });
}