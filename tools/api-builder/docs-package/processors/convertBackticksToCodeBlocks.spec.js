var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');
var path = require('canonical-path');

describe('convertBackticksToCodeBlocks', function() {
  var dgeni, injector, processor;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    processor = injector.get('convertBackticksToCodeBlocks');
  });

  it('should convert backtick code blocks to code-example blocks', function() {
    var docs = [{
      renderedContent:
        'preamble\n' +
        '```ts\n' +
        'export class TypeScriptClass {\n' +
        '}\n' +
        '```\n' +
        'postamble\n'
    }];
    processor.$process(docs);
    expect(docs[0].renderedContent).toEqual(
      'preamble\n' +
      '\n' +
      'code-example(format="linenums" language="ts").\n' +
      'export class TypeScriptClass {\n' +
      '}\n' +
      '\n' +
      ':marked\n' +
      'postamble\n'
    );
  });


  it('should ignore docs that have been marked as having unbalanced backticks', function() {
    var docs = [{
      renderedContent:
        'preamble\n' +
        '```ts\n' +
        'export class TypeScriptClass {\n' +
        '}\n' +
        'postamble\n'
    }];
    processor.$process(docs);

    expect(docs[0].renderedContent).toEqual(
      'preamble\n' +
      '```ts\n' +
      'export class TypeScriptClass {\n' +
      '}\n' +
      'postamble\n'
    );
  })
});

