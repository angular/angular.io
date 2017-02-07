/**
 * NOT a dgeni service because we need to be able to use it externally
 * as well as from dgeni.
 * @description
 *
 */
var _ = require('lodash');

var nullLine = '###';
var nullLinePattern = new RegExp(nullLine + '\n', 'g');

module.exports = {
  buildRegionDocs: buildRegionDocs,
  getRegionDoc: getRegionDoc,
  removeDocTags: removeDocTags
};

// split out each fragment in {content} into a separate doc
// a fragment is a section of text surrounded by
//   1) In front: a comment marker followed by '#docregion' followed by an optional region name. For example:
//        <-- #docregion foo --> for html
//     or // #docregion foo      for js/ts
//   2) In back: a comment marker followed by '#enddocregion'
// Regions can be nested and any regions not 'closed' are automatically closed at the end of the doc.

// empty enddocregion always closes last region started.
// enddocregions with names that do no match start region tags get ignored.
function buildRegionDocs(content, extn) {
  var commentInfo = getCommentInfo(extn);
  if (!commentInfo) {
    return  [ { content: content } ];
  }

  var lines = result = content.split(/\r?\n/);

  var docStack = []; // items will be both popped and removed from the middle
  var docMap = {};
  var docPlaster = '. . .';
  var doc;
  var regionNames;
  lines.forEach(function(line, ix) {
    if (isCommentLine(line, commentInfo.prefix)) {
      if (hasRegionTag(line)) {
        lines[ix] = nullLine;
        regionNames = getRegionNames(line);
        regionNames.forEach(function(rn) {
          doc = docMap[rn];
          if (!doc) {
            // regionName may be ''
            doc = {regionName: rn, ranges: [ { startIx: ix} ] };
            docMap[rn] = doc;
          } else {
            // only add a new range if prev range is closed
            var lastRange = doc.ranges[doc.ranges.length-1];
            if (lastRange.endIx) {
              doc.ranges.push({startIx: ix});
            }
          }
          docStack.push(doc);
        });

      } else if (hasEndRegionTag(line)) {
        lines[ix] = nullLine;
        regionNames = getEndRegionNames(line);
        regionNames.forEach(function(rn) {
          // handle endregions with no name specially.
          // They operate on the last region created.
          if (rn.length == 0) {
            if (docStack.length) {
              // update last item on the stack
              doc = docStack.pop();
              doc.ranges[doc.ranges.length - 1].endIx = ix;
            }
          } else {
            doc = docMap[rn];
            // ignore endregion if name is specified but not found.
            if (doc) {
              doc.ranges[doc.ranges.length - 1].endIx = ix;
              // remove doc from stack
              _.remove(docStack, function (item) {
                return item.regionName === rn;
              });
            }
          }
        });
      } else if (hasDocPlasterTag(line)) {
        line[ix] = nullLine;
        docPlaster =  getDocPlaster(line);
      }
    }
  });

  var docs = _.values(docMap);
  var plasterComment = docPlaster && commentInfo.plasterPattern.replace('{tag}', docPlaster);
  docs = reattachDocs(docs, lines, plasterComment);
  return docs;
}

function getRegionDoc(content, extn, regionName) {
  var docs = buildRegionDocs(content, extn);
  var doc = _.find(docs, function (doc) {
    return doc.regionName === regionName;
  });
  return doc && doc.content;
}

function removeDocTags(content, extn) {
  var commentInfo = getCommentInfo(extn);
  if (commentInfo == null) {
    return content;
  }
  var lines = result = content.split(/\r?\n/);

  lines.forEach(function(line, ix) {
    if (isCommentLine(line, commentInfo.prefix)) {
      if (hasDocTag(line)) {
        lines[ix] = nullLine;
      }
    }
  });
  var result = joinLines(lines);
  return result;
}

function reattachDocs(docs, lines, plasterComment) {

  docs.forEach(function(doc) {
    var content;
    var fragLines = [];
    doc.ranges.forEach(function (range) {
      var subLines;
      if (range.endIx) {
        subLines = lines.slice(range.startIx + 1, range.endIx);
      } else {
        subLines = lines.slice(range.startIx + 1);
      }
      if (plasterComment && fragLines.length) {
        // pad is the padding on the previous line
        var pad = fragLines[fragLines.length - 1].match(/(\s*)/)[0];
        fragLines.push(pad + plasterComment);
      }
      fragLines = fragLines.concat(subLines);
    });
    fragLines = trimLeftIndent(fragLines);
    doc.content = joinLines(fragLines);
  });
  return docs;
}



function getCommentInfo(extension) {
  var commentInfo;
  switch (extension) {
    case 'ts':
    case 'js':
    case 'es6':
    case 'dart':
      commentInfo = {
        prefix: '//',
        plasterPattern: '/* {tag} */'
      };
      break;
    case 'html':
      commentInfo = {
        prefix: '<!--',
        plasterPattern: '<!-- {tag} -->'
      };
      break;
    case 'css':
      commentInfo = {
        prefix: '/*',
        plasterPattern: '/* {tag} */'
      };
      break;
    case 'json':
      return null;
    case 'yaml':
      commentInfo = {
        prefix: '#',
        plasterPattern: '# {tag} '
      };
      break;
    case 'jade':
      commentInfo = {
        prefix: '//',
        plasterPattern: '// {tag} '
      };
      break;
    default:
      return null;
  }
  return commentInfo;
}

function isCommentLine(line, commentPrefix) {
  return line.trim().indexOf(commentPrefix) == 0;
}

function hasDocTag(line) {
  return hasRegionTag(line) || hasEndRegionTag(line) || hasDocPlasterTag(line);
}

function hasRegionTag(line) {
  return line.indexOf("#docregion") >= 0;
}

function hasEndRegionTag(line) {
  return line.indexOf("#enddocregion") >= 0;
}

function hasDocPlasterTag(line) {
  return line.indexOf("#docplaster") >= 0;
}

function getRegionNames(line) {
  return extractRegionNames(line, /#docregion\s*(\S.*)/);
}

function getEndRegionNames(line) {
  return extractRegionNames(line, /#enddocregion\s*(\S.*)/);
}

function getDocPlaster(line) {
  var rx =  /#docplaster\s*(\S.*)/;
  try {
    var plaster = line.match(rx)[1];
    plaster = plaster.replace("-->","").replace('\*\/',"");
    return plaster.trim();
  } catch (e) {
    return null;
  }
}

function extractRegionNames(line, rx) {
  try {
    var names = line.match(rx)[1];
    names = names.replace(/\s*/g,'');
    // Hack for html regions that look like <!-- #docregion --> or */
    names = names.replace("-->","").replace('\*\/',"");
    names = names.split(',');
    return names;
  } catch (e) {
    return [''];
  }
}

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

function joinLines(lines) {
  var content = lines.join('\n');
  // eliminate all #docregion lines
  content = content.replace(nullLinePattern, '');
  if (content.substr(-3) === nullLine) {
    content = content.substr(0, content.length - 3);
  }
  return content;
}