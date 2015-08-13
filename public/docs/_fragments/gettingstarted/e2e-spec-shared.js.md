```
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
```