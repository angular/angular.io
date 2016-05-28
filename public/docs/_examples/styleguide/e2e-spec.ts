/*global browser, element, by */
describe('Getting Started E2E Tests', function() {

	// #docregion shared
	var expectedMsg = 'My First Angular 2 App';

	// tests shared across languages
	function sharedTests(basePath) {
		beforeEach(function () {
			browser.get(basePath + 'index.html');
		});

		it('should display: '+ expectedMsg, function() {
			expect(element(by.id('output')).getText()).toEqual(expectedMsg);
		});
	}
	// #enddocregion

	describe('Getting Started in JavaScript', function() {
		sharedTests('gettingstarted/js/');
	});

	describe('Getting Started in TypeScript', function() {
		sharedTests('gettingstarted/ts/');
	});

});
