var targetFactory = require('./target');

describe('target inline-tag-def', function() {
  it('should filter out content that does not match the doc.targetEnvironments', function() {
    var doc, target, result;

    doc = {
      targetEnvironments: ['js', 'es6']
    };

    target = targetFactory();
    result = target.handler(doc, 'target', {
      tag: 'es6 ts',
      content: 'abc'
    });
    expect(result).toEqual('abc');

    result = target.handler(doc, 'target', {
      tag: 'ts',
      content: 'xyz'
    });
    expect(result).toEqual('');
  });
});