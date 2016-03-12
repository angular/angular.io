var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');

describe('extractPublicApiDecorator processor', function() {
  var dgeni, injector, processor;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    processor = injector.get('extractPublicApiDecorator');
  });

  it('should extract the decorator called PublicApi', function() {
    var doc = {
      decorators : [
        { name: 'SomeDecorator' },
        { name: 'PublicApi', argumentInfo: [
          'Stability.stable',
          'Some notes about the stability'
        ]},
        { name: 'OtherDecorator'}
      ]
    };
    processor.$process([doc]);
    expect(doc.publicApi).toEqual({
      stability : 'stable',
      notes : 'Some notes about the stability'
    });
  });
});

