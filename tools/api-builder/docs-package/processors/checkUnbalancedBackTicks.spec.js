var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');
var path = require('canonical-path');
var _ = require('lodash');

describe('checkUnbalancedBackTicks', function() {
  var dgeni, injector, processor, log;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    processor = injector.get('checkUnbalancedBackTicks');
    log = injector.get('log');
  });

  it('should warn if there are an odd number of back ticks in the rendered content', function() {
    var docs = [
      { renderedContent:
        '```\n' +
        'code block\n' +
        '```\n' +
        '```\n' +
        'code block with missing closing back ticks\n'
      }
    ];

    processor.$process(docs);

    expect(log.warn).toHaveBeenCalledWith('checkUnbalancedBackTicks processor: unbalanced backticks found in rendered content - doc');
    expect(docs[0].unbalancedBackTicks).toBe(true);
  });
});