///// Boiler Plate ////
import {bind} from 'angular2/angular2';

import {
  beforeEachBindings, DebugElement, RootTestComponent as RTC,
  // Jasmine overrides
  beforeEach, ddescribe, xdescribe, describe, iit, it, xit, //expect,
	AsyncTestCompleter, inject, RootTestComponent, TestComponentBuilder,
} from 'angular2/test';

//// Testing this component ////
import {AppComponent} from './app';

describe('AppComponent', () => {

	describe('(no DOM)', () => {

		it('component has name == "Alice"', () => {
			let app = new AppComponent;
			expect(app.name).toEqual('Alice');
		});
	});

	describe('(in DOM)', () => {

		it('component has name == "Alice"', injectTcb((tcb, done) => {
			tcb
        .createAsync(AppComponent)
        .then((rootTC:RTC) => {
					let ac:AppComponent = rootTC.componentInstance;
					expect(ac.name).toEqual('Alice');
				})
        .catch(fail).then(done,done);
		}));

		it('DOM has name == "Alice"', injectTcb((tcb, done) => {
			tcb
        .createAsync(AppComponent)
        .then((rootTC:RTC) => {
					rootTC.detectChanges();
					let domName = rootTC.componentViewChildren[0].nativeElement.innerHTML;
					expect(domName).toMatch('Alice');
				})
        .catch(fail).then(done,done);
		}));
		//rootTC.nativeElement.getElementsByTagName('h1')[0].innerHTML
		it('DOM has name == "Alice" (2)', injectTcb((tcb, done) => {
			tcb
        .createAsync(AppComponent)
        .then((rootTC:RTC) => {
					rootTC.detectChanges();
					let domName = rootTC.nativeElement
					   // jQuery goes here
						.getElementsByTagName('h1')[0].innerHTML;
					expect(domName).toMatch('Alice');
				})
        .catch(fail).then(done,done);
		}));
	});
});

/////////  test.helpers.ts: here for now ////////

function injectTcb(testFn: (tcb: TestComponentBuilder, done: ()=>void) => void) {
  return inject([TestComponentBuilder, AsyncTestCompleter], function injectWrapper(tcb: TestComponentBuilder, async: AsyncTestCompleter) {
    testFn(tcb, async.done.bind(async));
  });
}