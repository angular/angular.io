var INLINE_EXAMPLE = /(\S+)\s*(\S*)\s*(title=(?:".*?"|'.*?'))?\s*(stylePattern=(?:".*?"|'.*?'))?/

/**
 * @dgService exampleInlineTagDef
 * @description
 * Process inline example tags (of the form {@example some/uri region title='some title' stylePattern='{some style pattern}' }), replacing them with HTML anchors
 * @kind function
 * @param  {Object} url   The url to match
 * @param  {Function} docs error message
 * @return {String}  The html link information
 *
 * @property {boolean} relativeLinks Whether we expect the links to be relative to the originating doc
 */
module.exports = function exampleInlineTagDef(getLinkInfo, createDocMessage, log) {
  return {
    name: 'example',
    description: 'Process inline example tags (of the form {@example some/uri Some Title}), replacing them with HTML anchors',
    handler: function(doc, tagName, tagDescription) {

      // Parse out the uri and title
      return tagDescription.replace(INLINE_EXAMPLE, function(match, uri, region, attr1, attr2) {

        //var linkInfo = getLinkInfo(uri, title, doc);
        //
        //if ( !linkInfo.valid ) {
        //  log.warn(createDocMessage(linkInfo.error, doc));
        //}

        return "+makeExample('styleguide', 'js/index.html', 'index.html')";
      });
    }
  };
};