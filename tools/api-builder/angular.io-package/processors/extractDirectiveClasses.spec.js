var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');

describe('extractDirectiveClasses processor', function() {
  var dgeni, injector, processor;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    processor = injector.get('extractDirectiveClassesProcessor');
  });

  it('should extract specified decorator arguments', function() {
    var doc = {
      id: 'angular2/angular2.ngFor',
      name: 'ngFor',
      docType: 'class',
      decorators: [
        {
          name: 'Directive',
          arguments: ['{selector: \'[ng-for][ng-for-of]\', properties: [\'ngForOf\']}'],
          argumentInfo: [
            { selector: '[ng-for][ng-for-of]', properties: ['ngForOf'] }
          ]
        }
      ]
    };

    var docs = processor.$process([doc]);

    expect(doc).toEqual(jasmine.objectContaining({
      id: 'angular2/angular2.ngFor',
      name: 'ngFor',
      docType: 'directive',
      decorators: [
        {
          name: 'Directive',
          arguments: ['{selector: \'[ng-for][ng-for-of]\', properties: [\'ngForOf\']}'],
          argumentInfo: [
            { selector: '[ng-for][ng-for-of]', properties: ['ngForOf'] }
          ]
        }
      ]
    }));

    expect(doc.directiveOptions).toEqual({
      selector: '[ng-for][ng-for-of]',
      properties: ['ngForOf']
    });
  });
});