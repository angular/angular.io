describe('Protractor quick start test', function() {
	beforeEach(function() {
		browser.get('quickstart/index.html');
	});

	// #docregion test
	it('should display Alice', function() {
 		expect(element(by.id('output')).getText()).toEqual('Hello Alice');
	});
	// #enddocregion
});

