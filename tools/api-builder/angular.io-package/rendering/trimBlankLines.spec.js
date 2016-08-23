var factory = require('./trimBlankLines');

describe('trimBlankLines filter', function() {
  var filter;

  beforeEach(function() {
    filter = factory();
  });

  it('should be called "trimBlankLines"', function() {
    expect(filter.name).toEqual('trimBlankLines');
  });

  it('should remove empty lines from the start and end of the string', function() {
    expect(filter.process('\n  \n\nsome text\n  \nmore text\n  \n'))
        .toEqual('some text\n  \nmore text');
  });
});