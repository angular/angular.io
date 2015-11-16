exports.config = {
	onPrepare: function() {
		patchProtractorWait(browser);
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8080/',
	specs: [
    '**/*e2e-spec.js'
  ]
};

// Disable waiting for Angular as we don't have an integration layer yet...
// TODO(tbosch): Implement a proper debugging API for Ng2.0, remove this here
// and the sleeps in all tests.
function patchProtractorWait(browser) {
  browser.ignoreSynchronization = true;
  var _get = browser.get;
  var sleepInterval = process.env.TRAVIS || process.env.JENKINS_URL ? 14000 : 8000;
  browser.get = function() {
    var result = _get.apply(this, arguments);
    browser.sleep(sleepInterval);
    return result;
  }
}
