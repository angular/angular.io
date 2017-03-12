var _ = require('lodash');
var path = require('canonical-path');

var titleCase = function(text) {
  return text.replace(/(.)(.*)/, function(_, first, rest) {
    return first.toUpperCase() + rest;
  });
};

/*
* Create _data.json file for Harp pages
*
* http://harpjs.com/docs/development/metadata
*
* This method creates the meta data required for each page
* such as the title, description, etc. This meta data is used
* in the harp static site generator to create the title for headers
* and the navigation used in the API docs
*
*/


function processExportDoc(exportDoc) {
  // STABILITY STATUS
  // Supported tags:
  // @stable
  // @experimental
  // @deprecated
  // Default is the empty string (no badge)
  // Do not capitalize the strings, they are intended for use in constructing a css class from _hero.scss
  // and used in _hero.jade
  var stability = '';
  if (_.has(exportDoc, 'stable')) {
    stability = 'stable';
  } else if (_.has(exportDoc, 'experimental')) {
    stability = 'experimental';
  } else if (_.has(exportDoc, 'deprecated')) {
    stability = 'deprecated';
    exportDoc.showDeprecatedNotes = true;
  }

  var howToUse = '';
  if(_.has(exportDoc, 'howToUse')) {
    var howToUseArray = exportDoc.tags.tags.filter(function(tag) {
      return tag.tagName === 'howToUse'
    });

    // Remove line breaks, there should only be one tag
    howToUse = howToUseArray[0].description.replace(/(\r\n|\n|\r)/gm," ");
  }

  var whatItDoes = '';
  if(_.has(exportDoc, 'whatItDoes')) {
    var whatItDoesArray = exportDoc.tags.tags.filter(function(tag) {
      return tag.tagName === 'whatItDoes'
    });

    // Remove line breaks, there should only be one tag
    whatItDoes = whatItDoesArray[0].description.replace(/(\r\n|\n|\r)/gm," ");
  }

  // SECURITY STATUS
  // Supported tags:
  // @security
  // Default is no security risk assessed for api
  var security = false;
  if (_.has(exportDoc, 'security')) {
    var securityArray = exportDoc.tags.tags.filter(function(tag) {
      return tag.tagName === 'security'
    });

    // Remove line breaks, there should only be one tag
    security = securityArray[0].description.replace(/(\r\n|\n|\r)/gm," ");

    exportDoc.showSecurityNotes = true;
  }

  return {stability: stability, howToUse: howToUse, whatItDoes: whatItDoes, security: security};
}

module.exports = function addJadeDataDocsProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function(docs) {
      var extraDocs = [];
      var modules = [];
      var data = {};

      var appDataDoc = {
        id: 'api-list-data',
        aliases: ['api-list-data'],
        docType: 'api-list-data',
        data: data
      };
      extraDocs.push(appDataDoc);

      // create additional doc for auditing
      var appDataAuditDoc = {
        id: 'api-list-audit',
        aliases: ['api-list-audit'],
        docType: 'api-list-audit',
        data: data
      };
      extraDocs.push(appDataAuditDoc);


      /*
      * Create Data for Modules
      *
      * Modules must be public and have content
      */

      _.forEach(docs, function(doc) {
        if (doc.docType === 'module' && !doc.internal && doc.exports.length) {
          modules.push(doc);

          // GET DATA FOR INDEX PAGE OF MODULE SECTION
          var indexPageInfo = [{
            name: 'index',
            title: _.map(path.basename(doc.fileInfo.baseName).split('_'), function(part) {
              return titleCase(part);
            }).join(' '),
            intro: doc.description.replace('"', '\"').replace(/\s*(\r?\n|\r)\s*/g," "),
            docType: 'module'
          }];

          var decorators = {};

          // GET DATA FOR EACH PAGE (CLASS, VARS, FUNCTIONS)
          var modulePageInfo  = _(doc.exports)
          .map(function(exportDoc) {
            // if it ends with "Decorator", we store it in the map
            // to later merge with the token
            if (exportDoc.name.endsWith("Decorator") && exportDoc.callMember) {
              var p = processExportDoc(exportDoc.callMember);
              decorators[exportDoc.name] = {
                stability : p.stability,
                howToUse : p.howToUse,
                whatItDoes : p.whatItDoes,
                security : p.security,
                description : exportDoc.callMember.description,
                docType: 'decorator'
              };
              return null;

            } else {
              var p = processExportDoc(exportDoc);

              // Data inserted into jade-data.template.html
              var dataDoc = {
                name: exportDoc.name + '-' + exportDoc.docType,
                title: exportDoc.name,
                docType: exportDoc.docType,
                exportDoc: exportDoc,
                stability: p.stability,
                howToUse: p.howToUse,
                whatItDoes: p.whatItDoes,
                security: p.security
              };

              if (exportDoc.symbolTypeName) dataDoc.varType = titleCase(exportDoc.symbolTypeName);
              if (exportDoc.originalModule) dataDoc.originalModule = exportDoc.originalModule;

              return dataDoc;
            }
          })
          .filter(function(s) { return !!s; }) // filter out all null values
          .sortBy('name')
          .value();

          // find a matching symbol for every decorator item
          // and merge the data
          _.forEach(Object.keys(decorators), function(name) {
            var varToken = name.split("Decorator")[0];
            var c = modulePageInfo.filter(function(n) { return n.exportDoc.name === varToken; });

            c[0].docType = decorators[name].docType;
            Object.assign(c[0].exportDoc, decorators[name]);
          });

          doc.childPages = modulePageInfo;

          // ADD TO APP DATA DOC
          data[doc.id] = modulePageInfo;

          // COMBINE WITH INDEX PAGE DATA
          var allPageData = indexPageInfo.concat(modulePageInfo);

          // PUSH JADE DATA DOC TO EXTRA DOCS ARRAY
          extraDocs.push({
            id: doc.id + "-data",
            aliases: [doc.id + "-data"],
            docType: 'jade-data',
            originalDoc: doc,
            data: allPageData
          });
        }
      });

      return docs.concat(extraDocs);
    }
  };
};
