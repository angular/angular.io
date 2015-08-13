// protractor-spec.js
describe('Protractor quick start test', function() {

	// #docregion javascript
	it('should display Alice with JavaScript', function() {
 		browser.get('gettingstarted/js/index.html');
	});
	// #enddocregion
	
	// #docregion typescript
	it('should display Alice with TypeScrip', function() {
 		browser.get('gettingstarted/ts/index.html');
	});
	// #enddocregion
	
	afterEach(function() {
		expect(element(by.id('output')).getText()).toEqual('My first Angular 2 App');
	});
});

