var path = require('canonical-path');

/**
 * @dgService getLinkInfo
 * @description
 * Get link information to a document that matches the given url
 * @kind function
 * @param  {String} url   The url to match
 * @param  {String} title An optional title to return in the link information
 * @return {Object}       The link information
 *
 * @property {boolean} relativeLinks Whether we expect the links to be relative to the originating doc
 */
module.exports = function getLinkInfo(getDocFromAlias, encodeCodeBlock, log) {

  var deprecatedModuleName, indexOfDepDoc = -1, indexOfOtherDoc = -1;

  function isAmbiguityOk(docs) {
    if (docs.length != 2) return false;

    // Tolerate deprecated modules having an ambiguity with its non-deprecated counterpart.
    docs.forEach(function (doc, index) {
      var matches = doc.fileInfo.relativePath.match(/\/(\w+)-deprecated\//);
      if (matches) {
        deprecatedModuleName = matches[1];
        indexOfDepDoc = index;
      } else {
        indexOfOtherDoc = index;
      }
    });
    return indexOfDepDoc >= 0 &&
      docs[indexOfOtherDoc].fileInfo.relativePath.match(new RegExp('\/'+deprecatedModuleName+'\/'));
  }

  // Assumes that isAmbiguityOk(docs) has just been invoked.
  function ambiguityResolver(docs, url) {
    return url.indexOf('-deprecated') < 0 ? indexOfOtherDoc : indexOfDepDoc;
  }

  return function getLinkInfoImpl(url, title, currentDoc) {
    var linkInfo = {
      url: url,
      type: 'url',
      valid: true,
      title: title || url
    };

    if ( !url ) {
      throw new Error('Invalid url');
    }

    var docs = getDocFromAlias(url, currentDoc);
    var isAmbOk = getLinkInfoImpl.resolveAmbiguityForDeprecatedModules && isAmbiguityOk(docs);

    if ( !getLinkInfoImpl.useFirstAmbiguousLink && docs.length > 1 && !isAmbOk ) {

      linkInfo.valid = false;
      linkInfo.errorType = 'ambiguous';
      linkInfo.error = 'Ambiguous link: "' + url + '".\n' +
        docs.reduce(function(msg, doc) { return msg + '\n  "' + doc.id + '" ('+ doc.docType + ') : (' + doc.path + ' / ' + doc.fileInfo.relativePath + ')'; }, 'Matching docs: ');

    } else if ( docs.length >= 1 ) {

      const i = isAmbOk ? ambiguityResolver(docs, url) : 0;
      linkInfo.url = docs[i].path;
      linkInfo.title = title || encodeCodeBlock(docs[i].name, true);
      linkInfo.type = 'doc';

      if ( getLinkInfoImpl.relativeLinks && currentDoc && currentDoc.path ) {
        var currentFolder = path.dirname(currentDoc.path);
        var docFolder = path.dirname(linkInfo.url);
        var relativeFolder = path.relative(path.join('/', currentFolder), path.join('/', docFolder));
        linkInfo.url = path.join(relativeFolder, path.basename(linkInfo.url));
        log.debug(currentDoc.path, docs[i].path, linkInfo.url);
      }

    } else if ( url.indexOf('#') > 0 ) {
      var pathAndHash = url.split('#');
      linkInfo = getLinkInfoImpl(pathAndHash[0], title, currentDoc);
      linkInfo.url = linkInfo.url + '#' + pathAndHash[1];
      return linkInfo;

    } else if ( url.indexOf('/') === -1 && url.indexOf('#') !== 0 ) {

      if ( getLinkInfoImpl.isInvalidLinkOk && !getLinkInfoImpl.isInvalidLinkOk(url, currentDoc) ) {
        linkInfo.valid = false;
        linkInfo.errorType = 'missing';
        linkInfo.error = 'Invalid link (does not match any doc): "' + url + '"';
      }

    } else {

      linkInfo.title = title || (( url.indexOf('#') === 0 ) ? url.substring(1) : path.basename(url, '.html'));

    }

    return linkInfo;
  };
};