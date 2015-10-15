module.exports = function regionExtractor() {

  var nullLine = '###';
  var nullLinePattern = new RegExp(nullLine + '\n', 'g');

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

    lines.forEach(function(line, ix) {
      if (isCommentLine(line, commentPrefixes)) {
        if (hasRegionTag(line)) {
          if (doc) docStack.push(doc);
          doc = {startIx: ix, regionName: getRegionName(line)};
          lines[ix] = nullLine;
          docs.push(doc);
        } else if (hasEndRegionTag(line)) {
          if (doc) {
            lines[ix] = nullLine;
            doc.endIx = ix;
            doc = docStack.pop();
          }
        }
      }
    });

    docs.forEach(function(doc) {
      var fragLines, content;
      if (doc.endIx) {
        fragLines = lines.slice(doc.startIx + 1, doc.endIx);
      } else {
        fragLines = lines.slice(doc.startIx + 1);
      }
      fragLines = trimLeftIndent(fragLines);
      content = fragLines.join('\n');
      // eliminate all #docregion lines
      content = content.replace(nullLinePattern, '');
      if (content.substr(-3) === nullLine) {
        content = content.substr(0, content.length-3);
      }
      doc.content = content;
    });
    return docs;
  }

};

function trimLeftIndent(lines) {
  var minIx  = 100;
  var ok = lines.every(function(line) {
    // var ix = line.search(/\S/);
    var ix = line.search(/[^ ]/);
    if (ix === 0) return false;
    if (ix === -1) return true;
    if (ix > 0) {
      minIx = Math.min(minIx, ix);
    }
    return true;
  });
  if ( (!ok) || minIx === 100) return lines;

  var result = lines.map(function(line) {
    if (line.length > minIx) {
      return line.substr(minIx);
    } else {
      // this can happen if line is all blanks and shorter than mixIx
      return line;
    }
  });
  return result;
}

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
