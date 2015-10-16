/*global browser, element, by */
describe('QuickStart E2E Tests', function () {

	// #docregion shared
	var expectedMsg = 'My First Angular 2 App';

	// tests shared across languages
	function sharedTests(basePath) {
		beforeEach(function () {
			browser.get(basePath + 'index.html');
		});

		it('should display: ' + expectedMsg, function () {
			expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
		});
	}
	// #enddocregion

	describe('QuickStart in JavaScript', function () {
		sharedTests('quickstart/js/');
	});

	describe('QuickStart in TypeScript', function () {
		sharedTests('quickstart/ts/');
	});

});
