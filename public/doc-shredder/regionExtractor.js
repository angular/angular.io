module.exports = function regionExtractor() {
  // split out each fragment in {content} into a separate doc
  // a fragment is a section of text surrounded by
  //   1) In front: a comment marker followed by '#docregion' followed by an optional region name. For example:
  //        <-- #docregion foo --> for html
  //     or // #docregion foo      for js/ts
  //   2) In back: a comment marker followed by '#enddocregion'
  // Regions can be nested and any regions not 'closed' are automatically closed at the end of the doc.
  return function(content, commentPrefixes) {

    var lines = result = content.split(/\r?\n/);
    var docs = [];
    var docStack = [];
    var doc = null;
    var nullLine = '###';

    lines.forEach(function(line, ix) {
      if (isCommentLine(line, commentPrefixes)) {
        if (hasRegionTag(line)) {
          doc = {startIx: ix, regionName: getRegionName(line)};
          lines[ix] = nullLine;
          docs.push(doc);
          docStack.push(doc);
        } else if (hasEndRegionTag(line)) {
          lines[ix] = nullLine;
          doc.endIx = ix;
          doc = docStack.pop();
        }
      }
    });

    docs.forEach(function(doc) {
      var content;
      if (doc.endIx) {
        content = lines.slice(doc.startIx + 1, doc.endIx).join('\n');
      } else {
        content = lines.slice(doc.startIx + 1).join('\n');
      }
      // eliminate all #docregion lines
      var rx = new RegExp(nullLine + '\n', 'g');
      doc.content = content.replace(rx, '');

    });
    return docs;
  }

};

function isCommentLine(line, commentPrefixes) {
  return commentPrefixes.some(function(prefix) {
    return line.trim().indexOf(prefix) == 0;
  });
}

function hasRegionTag(line) {
  return line.indexOf("#docregion") >= 0;
}

function hasEndRegionTag(line) {
  return line.indexOf("#enddocregion") >= 0;
}

function getRegionName(line) {
  try {
    var name = line.match(/#docregion\s*(\S*).*/)[1];
    // Hack for html regions that look like <!-- #docregion --> or */
    name = name.replace("-->","").replace('\*\/',"");
    return name;
  } catch (e) {
    return '';
  }
}
