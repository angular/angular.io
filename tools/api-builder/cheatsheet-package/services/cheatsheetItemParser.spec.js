var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');

describe('cheatsheetItemParser', function() {
  var dgeni, injector, cheatsheetItemParser;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    cheatsheetItemParser = injector.get('cheatsheetItemParser');
  });

  it('should extract the syntax', function() {
    expect(cheatsheetItemParser('`abc`')).toEqual({
      syntax: 'abc',
      bold: [],
      description: ''
    });
  });

  it('should extract the bolds', function() {
    expect(cheatsheetItemParser('`abc`|`bold1`|`bold2`')).toEqual({
      syntax: 'abc',
      bold: ['bold1', 'bold2'],
      description: ''
    });
  });

  it('should extract the description', function() {
    expect(cheatsheetItemParser('`abc`|`bold1`|`bold2`some description')).toEqual({
      syntax: 'abc',
      bold: ['bold1', 'bold2'],
      description: 'some description'
    });
  });

  it('should allow bold to be optional', function() {
    expect(cheatsheetItemParser('`abc`some description')).toEqual({
      syntax: 'abc',
      bold: [],
      description: 'some description'
    });
  });

  it('should allow whitespace between the parts', function() {
    expect(cheatsheetItemParser('`abc`|  `bold1`|  `bold2`\n\nsome description')).toEqual({
      syntax: 'abc',
      bold: ['bold1', 'bold2'],
      description: '\n\nsome description'
    });
  })
});