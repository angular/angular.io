var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');

describe('addJadeDataDocsProcessor', function() {
  var dgeni, injector, processor;

  beforeEach(function() {
    dgeni = new Dgeni([mockPackage()]);
    injector = dgeni.configureInjector();
    processor = injector.get('addJadeDataDocsProcessor');
  });

  it('should add a doc for each module', function() {
    var exportDoc;
    var docs = [
      {
        docType: 'module',
        id: 'someModule',
        exports: [
          exportDoc = { name: 'someObj', docType: 'var', symbolTypeName: 'MyClass', originalModule: 'some/private/module' }
        ],
        fileInfo: { baseName: 'x_y' },
        description: 'some description\nsecond line'
      }
    ];
    docs = processor.$process(docs);

    expect(docs.filter(function(doc) { return doc.docType === 'jade-data'; })[0]).toEqual({
      id : 'someModule-data',
      aliases : [ 'someModule-data' ],
      docType : 'jade-data',
      originalDoc : docs[0],
      data : [
        { name : 'index', title : 'X Y', intro : 'some description second line', docType : 'module' },
        { name : 'someObj-var', title : 'someObj', varType : 'MyClass', docType: 'var',
            originalModule: 'some/private/module', exportDoc: exportDoc }
      ] });
  });

  it('should sort the exports into alphabetical order', function() {
    var alpha, beta, gamma, nu, mu;
    var docs = [
      {
        docType: 'module',
        id: 'someModule',
        exports: [
          beta = { name: 'Beta', docType: 'class'},
          alpha = { name: 'Alpha', docType: 'class'},
          gamma = { name: 'Gamma', docType: 'class'},
          nu = { name: 'Nu', docType: 'class'},
          mu = { name: 'Mu', docType: 'class'}
        ],
        fileInfo: { baseName: 'x_y' },
        description: 'some description\nsecond line'
      }
    ];
    docs = processor.$process(docs);

    expect(docs[2].data).toEqual([
      { name : 'index', title : 'X Y', intro : 'some description second line', docType : 'module' },
      { name: 'Alpha-class', title: 'Alpha', docType: 'class', exportDoc: alpha },
      { name: 'Beta-class', title: 'Beta', docType: 'class', exportDoc: beta },
      { name: 'Gamma-class', title: 'Gamma', docType: 'class', exportDoc: gamma },
      { name: 'Mu-class', title: 'Mu', docType: 'class', exportDoc: mu },
      { name: 'Nu-class', title: 'Nu', docType: 'class', exportDoc: nu }
    ]);

  });
});
