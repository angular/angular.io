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

module.exports = function addJadeDataDocsProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function(docs) {
      var extraDocs = [];
      var modules = [];

      var appDataDoc = {
        id: 'api-list-data',
        aliases: ['api-list-data'],
        docType: 'api-list-data',
        data: {}
      };
      extraDocs.push(appDataDoc);

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

          // GET DATA FOR EACH PAGE (CLASS, VARS, FUNCTIONS)
          var modulePageInfo  = _(doc.exports)
          .map(function(exportDoc) {
            var dataDoc = {
              name: exportDoc.name + '-' + exportDoc.docType,
              title: exportDoc.name,
              docType: exportDoc.docType,
              exportDoc: exportDoc
            };
            if (exportDoc.symbolTypeName) dataDoc.varType = titleCase(exportDoc.symbolTypeName);
            if (exportDoc.originalModule) dataDoc.originalModule = exportDoc.originalModule;
            return dataDoc;
          })
          .sortBy('name')
          .value();

          doc.childPages = modulePageInfo;

          // ADD TO APP DATA DOC
          appDataDoc.data[doc.id] = modulePageInfo;

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
