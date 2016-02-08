module.exports = function mergeDecoratorDocs() {
  return {
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        var makeDecorator = getMakeDecoratorCall(doc);
        if (makeDecorator) {
          doc.docType = 'decorator';
          doc.decoratorType = makeDecorator.arguments[0].text;
        }
      });
    }
  };
};

function getMakeDecoratorCall(doc, type) {

  var makeDecoratorFnName = 'make' + (type || '')+ 'Decorator';

  var initializer = doc.exportSymbol &&
                    doc.exportSymbol.valueDeclaration &&
                    doc.exportSymbol.valueDeclaration.initializer;

  if (initializer) {
    // There appear to be two forms of initializer:
    //    export var Injectable: InjectableFactory = <InjectableFactory>makeDecorator(InjectableMetadata);
    // and
    //    export var RouteConfig: (configs: RouteDefinition[]) => ClassDecorator = makeDecorator(RouteConfigAnnotation);
    // In the first case, the type assertion `<InjectableFactory>` causes the AST to contain an extra level of expression
    // to hold the new type of the expression.
    if (initializer.expression && initializer.expression.expression) {
      initializer = initializer.expression;
    }
    if (initializer.expression && initializer.expression.text === makeDecoratorFnName) {
      return initializer;
    }
  }
}